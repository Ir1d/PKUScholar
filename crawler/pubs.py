import pickle
from pypinyin import lazy_pinyin

with open('new_checkpoint.pkl', 'rb') as f:
    checkpoint = pickle.load(f)
    for name in checkpoint.keys():
        scholar = checkpoint[name]
        en_name = ''.join(lazy_pinyin(scholar['cn_name']))
        with open('./metainfo/{}.md'.format(en_name),'w',encoding='utf-8') as fw:
            fw.write('---\n')
            fw.write("en_name: {}\n".format(en_name))
            fw.write("cn_name: {}\n".format(scholar['cn_name']))
            fw.write("img_url: {}\n".format(scholar['img_src']))
            fw.write("homepage: {}\n".format(scholar['eecs_url']))
            fw.write("intro: {}\n".format(scholar['intro']))
            fw.write("google_info: {}\n".format(scholar['GoogleInfo']))
            fw.write("publicationTitles: {}\n".format(scholar['PublicationTitles']))
            fw.write('---\n')
