import csv
import mysql.connector

cnx = mysql.connector.connect(user='root', password='123456',
                              host='127.0.0.1',
                              port = "2589",
                              database = "dbexample")
cursor = cnx.cursor()

"""Delete from tables"""
try:
    cursor.execute("delete from player")
except mysql.connector.Error as err:
    print("Failed creating database: {}".format(err))

try:
    cursor.execute("delete from knownfor")
except mysql.connector.Error as err:
    print("Failed creating database: {}".format(err))


"""Create tables of the scheme"""

# cursor.execute( "CREATE TABLE `dbexample`.`knownfor`\
# ( `playerid` VARCHAR(45) NOT NULL,`movieid` VARCHAR(45) NOT NULL,\
# PRIMARY KEY (`playerid`, `movieid`));")

# cursor.execute("CREATE TABLE `knownfor` (\
#   `playerid` varchar(45) NOT NULL,\
#   `movieid` varchar(45) NOT NULL,\
#   PRIMARY KEY (`playerid`,`movieid`)\
# ) ENGINE=InnoDB DEFAULT CHARSET=latin1")


# cursor.execute("CREATE TABLE `movie` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `movieid` varchar(45) NOT NULL,\
#   `name` varchar(255) NOT NULL,\
#   `genre` varchar(45) DEFAULT NULL,\
#   `rating` varchar(45) DEFAULT NULL,\
#   PRIMARY KEY (`id`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=1026378 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci")

# cursor.execute("CREATE TABLE `player` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `playerid` varchar(45) NOT NULL,\
#   `name` varchar(255) NOT NULL,\
#   `birthyear` varchar(45) DEFAULT NULL,\
#   `deathyear` varchar(45) DEFAULT NULL,\
#   PRIMARY KEY (`id`),\
#   UNIQUE KEY `id_UNIQUE` (`id`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=905979 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci")

# cursor.execute("CREATE TABLE `rating` (
#                     `userid` int NOT NULL,\
#                     `movieid` varchar(45) NOT NULL,\
#                     `rate` decimal(10,0) NOT NULL,\
#                     `comment` varchar(800) DEFAULT NULL,\
#                     PRIMARY KEY (`userid`,`movieid`)\
#                   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


# cursor.execute("CREATE TABLE `users` (\
#   `idusers` int NOT NULL AUTO_INCREMENT,\
#   `username` varchar(45) NOT NULL,\
#   `password` varchar(45) NOT NULL,\
#   `email` varchar(256) NOT NULL,\
#   `age` tinyint NOT NULL,\
#   PRIMARY KEY (`idusers`),\
#   UNIQUE KEY `idusers_UNIQUE` (`idusers`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1")




with open("ImdbName.csv", 'r' , encoding = "utf8") as file:
  next(iter(file))
  csvreader = csv.reader(file)
  counter = 0
  cursor.execute("alter table player AUTO_INCREMENT = 1")
  for row in csvreader:
    playerid = row[0]
    for movieid in row[-1].split(","):
      try:
        cursor.execute("insert into knownfor(playerid, movieid) values(%s, %s);",
                       (playerid, movieid))
      except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
    birthyear = row[2]
    deathyear = row[3]
    try:
      birthyear = int(birthyear)
    except ValueError:
      birthyear = None
    try:
      deathyear = int(deathyear)
    except ValueError:
      deathyear = None
    cursor.execute("insert into player(playerid, name, birthyear, deathyear) values(%s,%s,%s,%s);",
                   (playerid,row[1],birthyear,deathyear))

    counter+=1
    # print(playerid, movieid)
    # if counter >= 10:
    #   break

cnx.commit()
cursor = cnx.cursor()


# with open("ImdbTitleBasics.csv", 'r' , encoding = "utf8") as file:
#     next(iter(file))
#     csvreader = csv.reader(file)
#     counter = 0
#     cursor.execute("alter table basictable AUTO_INCREMENT = 1")
#     for row in csvreader:
#         genre = row[-1]
#         if genre.lower() == "\\n":
#             genre = None
#         counter+=1
#         # print(row)
#         # if counter == 10:
#         #   break
#         try:
#             cursor.execute("insert into movie(movieid, name, genre, rating) values(%s,  %s, %s,%s);",
#                            (row[0],row[2], genre, None))
#         except mysql.connector.Error as err:
#             print("Failed creating database: {}".format(err))
# cnx.commit()
# cursor = cnx.cursor()


"""
with open("ImdbTitleAkas.csv", 'r' , encoding = "utf8") as file:
    next(iter(file))
    csvreader = csv.reader(file)
    counter = 0
    cursor.execute("alter table basictable AUTO_INCREMENT = 1")
    for row in csvreader:
        region = row[3]
        movieid = row[0]
        if region.lower() ==  "\\n":
            region = None
        counter += 1
        print(row)
        if counter == 10:
            break
        try:
            cursor.execute("update movie set region = %s where movieid == %s;",(region,movieid))
        except mysql.connector.Error as err:
            print("Failed creating database: {}".format(err))

cnx.commit()
cursor = cnx.cursor()
"""


