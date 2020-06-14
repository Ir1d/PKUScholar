import pickle
import requests
from tqdm import tqdm
from bs4 import BeautifulSoup

header = {
    'Accept':
        'application/json, text/plain, */*',
    'Accept-Encoding':
        'gzip, deflate, br',
    'Accept-Language':
        'zh-CN,zh;q=0.9,en;q=0.8',
    'User-Agent':
        'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0',
    
}

def GetPaperUrl(title):
    url = "https://www.researchgate.net/search.Search.html?type=publication&query={}".format(title)
    html = requests.get(url)
    html.encoding = 'utf-8'
    with open('html.html','w',encoding='utf-8') as f:
        f.write(html.text)
    soup = BeautifulSoup(html.text,"html.parser",from_encoding='utf-8')
    url = None
    print(len(html.text))
    for node in soup.find_all(name='a'):
        #print(node.get('class'),node.text)
        if 'nova-e-link--theme-bare' in node.get('class',[]):
            print(node.text)
            url = r'https://www.researchgate.net/' + node.get('href')
            print(url)
            break
    return url
    

def GetPaperInfoByURL(url):
    html = requests.get(url)
    html.encoding = 'utf-8'
    soup = BeautifulSoup(html.text,"html.parser",from_encoding='utf-8')
    metas = soup.find_all(name='div')
    for m in metas:
        if 'research-detail-meta' in m.get('class',[]):
            print(m)

GetPaperInfoByURL(GetPaperUrl('TOPAS Simulation of the Mevion S250 compact proton therapy unit'))
'''

def getDblpBibex(key):
    url = r'https://dblp.org/rec/bibtex/' + key
    res = requests.get(url)
    soup = BeautifulSoup(res.text,'lxml')
    pres = soup.find_all(name='pre')
    for pre in pres:
        bibex = pre
        break
    return bibex.text


def getPaperByTitle(title):
    url =  'https://dblp.org/search/publ/api?q=' + str(title)
    res = requests.get(url)
    soup = BeautifulSoup(res.text,'lxml')
    hits = soup.find_all(name='hit')
    record = {'title':title,'authors':[]}
    for hit in hits:
        info = hit.find(name='info')
        if info is not None:
            # print(info)
            authors = info.find('authors')
            for author in authors.find_all(name='author'):
                record['authors'].append(author.text)
            for child in info.findChildren():
                if child.name not in ['authors', 'title','author']:
                    record[child.name] = child.text
            record['bibex'] = getDblpBibex(record.get('key'))
        break

    return record

with open('titles.pkl','rb') as f:
    titles = pickle.load(f)
    records = {}
    id = 0
    for title in tqdm(titles):
        record = getPaperByTitle(title)
        records[title] = record
        id += 1
        if id % 100 == 0:
            pickle.dump(records, open('papers.pkl','wb'))
'''