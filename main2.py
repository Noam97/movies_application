import csv


professions = set()
genres = set()
movies_known_for = set()

with open("ImdbName.csv", 'r' , encoding = "utf8") as file:
    csvreader = csv.reader(file)
    next(csvreader)
    for row in csvreader:
        curr_professions = row[4].split(",")
        for prof in curr_professions:
            professions.add(prof)

print(professions)
print(len(professions))

# Table - name of individual, prof. bit(39)

