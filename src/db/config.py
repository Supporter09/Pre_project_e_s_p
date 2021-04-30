import json

with open("data.json",encoding="utf8") as jsonFile:
    data = json.load(jsonFile)
    # print(data)
with open("D:\Project Protect Endangered Species\project_e.s.p_special\src\db\data2.json", encoding="utf8") as jsonFile:
    data2 = json.load(jsonFile)
    # print(data2)


for i in range(len(data)):
    data[i]["Image"] = data2[i]["Image"]

with open('D:\Project Protect Endangered Species\project_e.s.p_special\src\db\sample.json', 'w', encoding='utf8') as fp:
    json.dump(data, fp, ensure_ascii=False)