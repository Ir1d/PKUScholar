# functions to get basic info of EECS scholars
# By Sishuo Chen
 
import time
import pickle
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup
from pypinyin import lazy_pinyin
s = requests.session()
s.keep_alive = False
website_prefix = 'https://eecs.pku.edu.cn'
import imghdr
header = {
    'Accept':
        'application/json, text/plain, */*',
    'Accept-Encoding':
        'gzip, deflate, br',
    'Accept-Language':
        'zh-CN,zh;q=0.9',
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
}

url = r'https://eecs.pku.edu.cn/szdw1/zzjs1.htm'


import re
 
def validateTitle(title):
    rstr = r"[\/\\\:\*\?\"\<\>\|]"  # '/ \ : * ? " < > |'
    new_title = re.sub(rstr, "_", title)  # 替换为下划线
    return new_title

def validateHTMLtext(text):
    rstr = r"[\\]"
    new_text = re.sub(rstr, " ", text)
    return new_text

def get_selfie(eecs_url):
    res = requests.get(eecs_url,headers=header)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text,'lxml')
    div = soup.find(name='div',id='vsb_content')
    div = div.find(name='div').find(name='div')
    img_src = website_prefix + div.find(name='div').find(name='img').attrs['src']
    div = div.find_all(name='div')[1].find('div')
    intro = [p.text for p in div.find_all(name='p')]
    return img_src,intro

def getTeacherBasicInfo():
    result = requests.get(url,headers=header)
    result.encoding='utf-8'
    soup = BeautifulSoup(result.text,'lxml')
    teacherInfoList = []
    for li in soup.find_all(name='p'):
        if 'id' in li.attrs:
            try:
                teacher = {}
                cn_name = li.text
                eecs_url = website_prefix + '/'+li.find('a').attrs['href'][3:]
                print(eecs_url)
                en_name = str(lazy_pinyin(cn_name[1:])) + " " + str(lazy_pinyin(cn_name[0:1]))
                img_src,intro = get_selfie(eecs_url)
                teacher['eecs_url'] = eecs_url
                teacher['cn_name'] = cn_name
                teacher['img_src'] = img_src
                teacher['intro'] = intro
                teacher['en_name'] = en_name
                teacherInfoList.append(teacher)
                print(teacher['cn_name'])
            except Exception as e:
                print(e)
    pickle.dump(teacherInfoList,open('teacherInfoList.pkl','wb'))


def convertName(name):
    name = name.replace('-','')
    name = ''.join(name.split()[:2][::-1]).lower()
    return name

def getPaperInfo():
    paper_record = pickle.load(open('papers.pkl','rb'))
    id = 0
    for paper in tqdm(list(paper_record.values())):
        title = paper.get('title')
        with open('./newpaperinfo/{}.md'.format(id),'w',encoding='utf-8') as fw:
            fw.write('---\n')
            fw.write(validateHTMLtext('''title: "{}"\n'''.format(paper.get('title'))))
            authors = paper.get('authors',[])
            key_authors = [convertName(name) for name in authors]
            fw.write(validateHTMLtext("authors: {}\n".format(authors)))
            fw.write(validateHTMLtext("authors-key: {}\n".format(key_authors)))
            fw.write(validateHTMLtext('''year: "{}"\n'''.format(paper.get('year','数据暂缺'))))
            fw.write(validateHTMLtext('''article-link: "{}"\n'''.format(paper.get('ee','数据暂缺'))))
            fw.write(validateHTMLtext('''venue: "{}"\n'''.format(paper.get('venue','数据暂缺'))))
            #fw.write("google_info: {}\n".format(scholar['GoogleInfo']))
            fw.write('''bibex: "{}"\n'''.format(paper.get('bibex','数据暂缺').strip('\n')))
            fw.write('---\n')

        id += 1
        

def getEnName(cn_name):
    if cn_name == '曾钢':
        return 'gang zen'
    if cn_name == '曾炜':
        return 'wei zen'
    if cn_name == '解晓东':
        return 'xiaodong xie'
    return ''.join(lazy_pinyin(cn_name[1:]))+' ' + ''.join(lazy_pinyin(cn_name[0:1]))

            
def getPid(en_name):
    if en_name == 'xihong wu':
        return '49/6048'
    if en_name == 'hao dong':
        return '14/1525-8'
    if en_name == 'tian liu':
        return '49/4426-1'
    if en_name == 'dingsheng luo':
        return '64/5953'
    if en_name == 'xu sun':
        return '37/1971-1'
    if en_name == 'huarui zhang':
        return '116/0259'
    if en_name == 'lijun chen':
        return 'c/LijunChen2'
    if en_name =='zhi jin':
        return '22/3510'
    if en_name == 'tingting jiang':
        return '72/2833'
    if en_name == 'hanping wang':
        return '82/11519'
    if en_name == 'junlin lu':
        return '57/7863'
    if en_name == 'yun liang':
        return '83/2265'
    if en_name == 'bin cui':
        return '55/5031'
    if en_name == 'chao xu':
        return '79/1442-6'
    if en_name == 'jinshi cui':
        return '21/2565'
    url = "https://dblp.org/search/author/api?q={}".format(en_name)
    res = requests.get(url)
    soup = BeautifulSoup(res.text,'lxml')
    results = soup.find('result')
    hits = results.find('hits')
    info = hits.find('hit').find('info').text
    pid = info.split(r'pid/')[1].split('<')[0]
    return pid 

def getBib(paper_id):
    biburl = "https://dblp.org/rec/bib1/{}.bib".format(paper_id)
    bib_text = requests.get(biburl).text 
    return biburl,bib_text

def getPersonInfo(pid):
    papers = {}
    url = "http://dblp.org/pid/{}.xml".format(pid)
    res = requests.get(url,headers=header)
    soup = BeautifulSoup(res.text,'lxml')
    coauthor_items = soup.find('coauthors').find_all('co')
    coauthor_names = []
    coauthor_ids = []
    for c in coauthor_items:
        na = c.find('na')
        coauthor_names.append(na.text)
        coauthor_ids.append(na.attrs['pid'])
    rss  = soup.find_all('r')
    for r in rss:
        try:
            article = r.find('article')
            if article is None:
                article = r.find('inproceedings')
            if article is None:
                continue
            article_key = article.attrs['key']
            mdate = article.attrs['mdate']
            author_names = []
            author_keys = []
            author_items = article.find_all('author')
            for author in author_items:
                author_keys.append(author.attrs['pid'])
                author_names.append(author.text)
            title = article.find('title').text
            bib_url,bib_text = getBib(article_key)
            ee = article.find('ee').text  
            papers[article_key] = {
                'article_key': article_key,
                'author_names': author_names,
                'author_keys' : author_keys,
                'title': title,
                'bib_url':bib_url,
                'bib_text':bib_text,
                'ee': ee 
            }
        except Exception as e:
            continue
    return coauthor_names,coauthor_ids,papers

def update_info():
    with open('new_checkpoint.pkl','rb') as f:
        teachers_info = pickle.load(f)
    for teacher_name in tqdm(teachers_info.keys()):
        try:
            teachers_info[teacher_name]['en_name'] = getEnName(teachers_info[teacher_name]['cn_name'])
            print(teachers_info[teacher_name]['cn_name'])
            print(teachers_info[teacher_name]['en_name'])
            pid = getPid(teachers_info[teacher_name]['en_name'])
            teachers_info[teacher_name]['pid'] = pid 
            coauthor_names,coauthor_ids,papers = getPersonInfo(pid)
            teachers_info[teacher_name]['coauthor_names'] = coauthor_names
            teachers_info[teacher_name]['coauthor_ids'] = coauthor_ids
            teachers_info[teacher_name]['papers'] = papers
        except Exception as e:
            print(e)
    pickle.dump(teachers_info,open('teachers_info5-19.pkl','wb'))


def update_info_miss():
    with open('teachers_info5-20-new.pkl','rb') as f:
        teachers_info = pickle.load(f)
    for teacher_name in tqdm(teachers_info.keys()):
        if 'papers' in teachers_info[teacher_name].keys() and len(teachers_info[teacher_name]['papers']) > 0:
            continue
        try:
            teachers_info[teacher_name]['en_name'] = getEnName(teachers_info[teacher_name]['cn_name'])
            print(teachers_info[teacher_name]['cn_name'])
            print(teachers_info[teacher_name]['en_name'])
            pid = getPid(teachers_info[teacher_name]['en_name'])
            teachers_info[teacher_name]['pid'] = pid 
            coauthor_names,coauthor_ids,papers = getPersonInfo(pid)
            teachers_info[teacher_name]['coauthor_names'] = coauthor_names
            teachers_info[teacher_name]['coauthor_ids'] = coauthor_ids
            teachers_info[teacher_name]['papers'] = papers
        except Exception as e:
            print(e)
    pickle.dump(teachers_info,open('teachers_info5-20-new.pkl','wb'))






def getPhoto():
    import urllib
    with open('teacherInfoList.pkl','rb') as f:
        teachers_info = pickle.load(f)
    imgs = [teacher['img_src'] for teacher in teachers_info]
    i = 0
    for img in imgs:
        urllib.request.urlretrieve(img,'imgs/{}.jpg'.format(i))
        print(img)
        i += 1
    
def select_photo():
    import os 
    from PIL import Image
    i = 0 
    for img in os.listdir('imgs'):
        try:
            f = Image.open('imgs/{}'.format(img))
            f.save('icons/{}.jpg'.format(i))
            i += 1 
        except Exception as e:
            print(e)

def draw_image():
    import os
    import math 
    from PIL import Image
    images_list = os.listdir('icons')
    length = len(images_list)  # 头像总数
    image_size = 2560 
    each_size = math.ceil(image_size / math.floor(math.sqrt(length)))
    lines = math.ceil(math.sqrt(length))  # 列数
    rows = math.ceil(math.sqrt(length))  # 行数
    image = Image.new('RGB', (each_size * lines, each_size * rows))
    row = 0
    line = 0
    os.chdir('icons')  # 切换工作目录
    for file in images_list:  # 遍历每个头像
        try:
            with Image.open(file) as img:
                img = img.resize((each_size, each_size))
                image.paste(img, (line * each_size, row * each_size))
                line += 1
                if line == lines: # 一行填满后开始填下一行
                    line = 0
                    row += 1
        except IOError:
                print(f"头像{file}异常，请查看")
                continue
 
    img = image.save("../all.png") 


def readConvert():
    with open("teachers_info5-20-new.pkl",'rb') as f:
        teachers_info = pickle.load(f)
    papers = {}
    for teacher_name in tqdm(teachers_info.keys()):
        if 'papers' not in teachers_info[teacher_name].keys() or len(teachers_info[teacher_name]['papers']) == 0:
            continue
        teacher = teachers_info[teacher_name]
        file_name = ''.join(teacher['en_name'].strip().split())
        with open('teachers/{}.md'.format(file_name),'w',encoding='utf-8') as f:
            f.write('---\n')
            f.write('''en_name: "{}"\n'''.format(teacher['en_name']))
            f.write('''cn_name: "{}"\n'''.format(teacher['cn_name']))
            f.write('''img_src: {}\n'''.format(teacher['img_src']))
            f.write('''homepage: {}\n'''.format(teacher['eecs_url']))
            f.write('''intro: {}\n'''.format(teacher['intro']))
            f.write('''pid: "{}"\n'''.format(teacher['pid']))
            f.write('''coauthor_names: {}\n'''.format(teacher['coauthor_names']))
            f.write('''coauthor_ids: {}\n'''.format(teacher['coauthor_ids']))
            f.write('''paper_keys: {}\n'''.format(list(teacher['papers'].keys())))
            f.write('---\n')
        for key in teacher['papers'].keys():
            if key not in papers.keys():
                papers[key] = teacher['papers'][key]
    papers_json = list(papers.values())
    import json
    with open("x.json",'w',encoding='utf-8') as f:
        json.dump(papers_json,f,indent=2)

def readConvertTeachers():
    with open("teachers_info5-20-new.pkl",'rb') as f:
        teachers_info = pickle.load(f)
    keys = list(teachers_info.keys())
    for teacher_name in keys:
        if 'papers' not in teachers_info[teacher_name].keys() or len(teachers_info[teacher_name]['papers']) == 0:
            teachers_info.pop(teacher_name)
            continue
        teachers_info[teacher_name].pop('papers')
    teachers_json = list(teachers_info.values())
    import json
    with open("teachers.json",'w',encoding='utf-8') as f:
        json.dump(teachers_json,f,indent=2, ensure_ascii=False)


def readNames():
    with open("teachers-info-withtime.pkl",'rb') as f:
        teachers_info = pickle.load(f)
    names = list([teacher['cn_name'] for teacher in teachers_info.values()] )
    with open('name.txt','w',encoding='utf-8') as f:
        f.write(str(names))

readNames()



