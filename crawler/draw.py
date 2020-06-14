# 1. 读取《红楼梦》人物名称，统计不同人物个数，注意可能同一个人有几种名称，在名称文件中用“-”分隔
import pickle
from tqdm import tqdm 
person_num = 0
person_list = []
with open("teachers-info-withtime.pkl",'rb') as f:
    teachers_info = pickle.load(f)
papers = {}
key2name = {}
name2key = {}
for teacher_name in tqdm(teachers_info.keys()):
    if 'papers' not in teachers_info[teacher_name].keys() or len(teachers_info[teacher_name]['papers']) == 0:
        continue
    person_num += 1 
    teacher = teachers_info[teacher_name]
    key2name[teacher['pid']] = teacher['cn_name']
    name2key[teacher['cn_name']] = teacher['pid']
    for key in teacher['papers'].keys():
        if key not in papers.keys():
            papers[key] = teacher['papers'][key]
person_list = list(key2name.values())

print(person_num)
import numpy as np
# 2. 读取《红楼梦》文本，已经分词，通过“。”分隔句子，统计每句中人物共现次数，生成共现矩阵
matrix = np.zeros((person_num, person_num))

for paper in papers.values():
    for i in range(len(person_list)):
        for j in  range(i+1,len(person_list)):
            if name2key[person_list[i]] in paper['author_keys'] and name2key[person_list[j]] in paper['author_keys']:
                matrix[i][j] += 1    
                matrix[j][i] += 1
print(np.sum(matrix))
#方案2，绘制力导向
from pyecharts.charts.basic_charts.graph import Graph
import pandas as pd
import igraph

#import  cairo 
g=igraph.Graph(1)#实例化一个igraph对象d

df = pd.DataFrame(matrix,index=[i for i in range(person_num)],columns=[i for i in range(person_num)])
g.add_vertices(df.index)#添加igraph顶点（就是力导布局图中的节点），数据来自excel文件的行索引
weights=[]#备用空列表，用于存储igraph聚类所需要的权重信息

my_links=[] #备用空列表，用于存储pyecharts的链接信息

for i in range(person_num):#外层循环，轮询excel每个列
    for j in range(person_num):#内层循环，轮询excel每一行
        if matrix[i][j] >0:#大于0的值有效
            my_links.append({'source':i,'target':(j),'value':matrix[i][j]})#从excel中读取数据，填入上面的备用列表中
            g.add_edge(i,j)#添加边信息到igraph中，igraph的边对应pyecharts的links
            weights.append(matrix[i][j])#添加权重信息到igraph的备用列表

            
if not g.vs[0]['name']:#判断igraph是否自动生成了‘None’顶点
    g.delete_vertices(0)#删除None顶点
print(weights)
result=g.community_multilevel(weights,True)#运行聚类算法，结果存放在result变量里，包含两种聚类结果
print(result)
# igraph.plot(result[1],mark_groups = True, margin = 20,vertex_label=[i for i in range(len(df.index))]) 
#根据聚类结果，使用igraph的绘图函数绘图，显示聚类结果

colors_list=['yellowgreen', 'gold', 'lightskyblue', 'lightcoral',
'darkslateblue','#ADD8E6','#DDA0DD',
'#FAA460','#F0E68C','#8c564b','#e377c2',
'#7f7f7f','#bcbd22','#17becf']#备用颜色列表

category_dic={}#备用空字典，存放每个顶点（节点）对应的分类

for list_data in result[1]:#取第一种聚类结果，循环访问聚类结果中的每一个“小团伙”
    for data in list_data:#循环访问每一个“小团伙”中的顶点，以便标记团伙内的顶点的分类
        category_dic[df.index[data]]=df.index[list_data[0]]#把“小团伙”内每个顶点标记为同一个分类，分类名称以团伙第一个认的名字命名，记录到备用字典中

sym_x=[]#备用空列表，用于存放excel中每一行的数据和，即该顶点向其他顶点发射的数据总和

sym_y=[]#备用空列表，用于存放excel中每一列的数据和，即该顶点接收其他顶点发射的数据总和

sym=[]#备用空列表，用于存放excel中每一个顶点所在的行列的数据值的和，即一个顶点发射和接收的数据总和

for i in df.index:#对每个顶点循环
    sym_x.append(sum(df.loc[i]))#计算每个顶点的发射数据总和，填入备用列表

for i in df.columns:#对每个顶点循环
    sym_y.append(sum(df[i]))#计算顶点的接收数据总和，填入备用列表

for a,b in zip(sym_x,sym_y):#对每个顶点的发射和接收数据同时进行循环
    sym.append(a+b)#计算总和，填入备用列表

my_nodes=[{'name':person_list[i],'symbolSize':int(np.sqrt(j)*np.sqrt(max(sym))/max(sym)*25),
'category':category_dic[i],'value':j,'draggable':1} for i,j in zip(df.index,sym)]#生成节点数据，填入每个节点的名字，图标大小，分类，数据总数。

category=[{'name':int(df.index[i][0])} for i in result[1]]#pyecharts需要知道一共有多少种分类，固定格式

graph = Graph(is_legend_show=False)#实例化pyecharts里的力导布局图

graph.add('', my_nodes, my_links, category,gravity=1.0,)#绘制力导布局图，节点间距离通过graph_gravity参数调节。

graph.render('pku.html')#保存图表，在当前目录下生成‘graph.html’文件，需要手动用浏览器打开