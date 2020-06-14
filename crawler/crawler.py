import requests
import scholarly
import pickle
from tqdm import tqdm


def getGoogleInfo(name):
    search_query = scholarly.search_author(name+',Peking')
    author = next(search_query)
    author = author.fill()
    GoogleInfo = author.__str__()
    publicationTitles = [pub.bib['title'] for pub in author.publications]
    return GoogleInfo, publicationTitles



checkpoint = pickle.load(open('checkpoint.pkl','rb'))

with open('teacherInfoList.pkl','rb') as f:
    teacherInfoList = pickle.load(f)
    for teacher in tqdm(teacherInfoList[::-1]):
        en_name = teacher['en_name']
        print(teacher['cn_name'])
        if teacher['cn_name'] in checkpoint.keys():
            print(teacher['cn_name'],'已获得，跳过')
            continue
        checkpoint[teacher['cn_name']] = teacher
        GoogleInfo = ''
        PublicationsTitles = ''
        try:
            GoogleInfo,PublicationTitles = getGoogleInfo(en_name)
            print(teacher['cn_name'],"获取成功")
        except Exception as e:
            print(e)
        teacher['GoogleInfo'] = GoogleInfo
        teacher['PublicationTitles'] = PublicationTitles
        checkpoint[teacher['cn_name']] = teacher
        print('saving^^^')
        pickle.dump(checkpoint,open('checkpoint.pkl','wb'))
        print(teacher['cn_name'],"保存成功")
        
