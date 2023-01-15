# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import csv
import mysql.connector

cnx = mysql.connector.connect(user='root', password='123456',
                              host='127.0.0.1',
                              port = "2589",
                              database = "dbexample")


cursor = cnx.cursor()

"""Create tables"""

# cursor.execute("CREATE TABLE `basictable` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `moviename` varchar(512) NOT NULL,\
#   `movietype` varchar(512) NOT NULL,\
#   PRIMARY KEY (`id`),\
#   UNIQUE KEY `id_UNIQUE` (`id`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=1049171 DEFAULT CHARSET=latin1")

# cursor.execute("CREATE TABLE `imbdtitleakas` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `region` varchar(45) DEFAULT NULL,\
#   `language` varchar(45) DEFAULT NULL,\
#   PRIMARY KEY (`id`),\
#   UNIQUE KEY `id_UNIQUE` (`id`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=1048675 DEFAULT CHARSET=latin1")

# cursor.execute("CREATE TABLE `imdbname` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `mainactor` varchar(45) NOT NULL,\
#   `birthyear` varchar(30) DEFAULT NULL,\
#   `deathyear` varchar(45) DEFAULT NULL,\
#   `knownfortitles` varchar(45) DEFAULT NULL,\
#   PRIMARY KEY (`id`)\
# ) ENGINE=InnoDB AUTO_INCREMENT=1048756 DEFAULT CHARSET=latin1")

# cursor.execute("CREATE TABLE `ratingtable` (\
#   `id` int NOT NULL AUTO_INCREMENT,\
#   `averagerating` int NOT NULL,\
#   `numvotes` int NOT NULL,\
#   PRIMARY KEY (`id`),\
#   CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `basictable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
# ) ENGINE=InnoDB AUTO_INCREMENT=1048603 DEFAULT CHARSET=latin1")



"""Delete tables"""
# try:
#     cursor.execute("delete from ratingtable")
# except mysql.connector.Error as err:
#     print("Failed creating database: {}".format(err))

# try:
#     cursor.execute("delete from basictable")
# except mysql.connector.Error as err:
#     print("Failed creating database: {}".format(err))


# with open("ImdbTitleBasics.csv", 'r' , encoding = "utf8") as file:
#     next(iter(file))
#     csvreader = csv.reader(file)
#     counter = 0
#     cursor.execute("alter table basictable AUTO_INCREMENT = 1")
#     for row in csvreader:
#         counter+=1
#         print(row)
#         # if counter == 100:
#         #   break
#         try:
#             cursor.execute("insert into basictable(moviename, movietype) values(%s, %s);", (row[2],row[1]))
#         except mysql.connector.Error as err:
#             print("Failed creating database: {}".format(err))
#     cnx.commit()
#     cursor = cnx.cursor()

# with open("ImdbTitleRatings.csv", 'r' , encoding = "utf8") as file:
#     next(iter(file))
#     csvreader = csv.reader(file)
#     counter = 0
#     cursor.execute("alter table ratingtable AUTO_INCREMENT = 1")
#     for row in csvreader:
#         counter +=1
#         print(row)
#         # if counter == 10:
#         #     break
#         try:
#             cursor.execute("insert into ratingtable(movieid, averagerating,numvotes) values(%s,%s, %s);", (row[0],row[1],row[2]))
#         except mysql.connector.Error as err:
#             print("Failed creating database: {}".format(err))
#     cnx.commit()
#     cursor = cnx.cursor()

# with open("ImdbName.csv", 'r' , encoding = "utf8") as file:
#   next(iter(file))
#   csvreader = csv.reader(file)
#   counter = 0
#   cursor.execute("alter table imdbname AUTO_INCREMENT = 1")
#   for row in csvreader:
#     counter+=1
#     print(row)
#     if counter == 10:
#       break
#     try:
#         cursor.execute("insert into imdbname(mainactor,birthyear, deathyear,knownfortitles) values(%s, %s, %s,%s);", (row[1],row[2], row[3],row[5]))
#     except mysql.connector.Error as err:
#         print("Failed creating database: {}".format(err))

# cnx.commit()
# cursor = cnx.cursor()


#region not relevant
# with open("ImdbTitleAkas.csv", 'r' , encoding = "utf8") as file:
#     next(iter(file))
#     csvreader = csv.reader(file)
#     counter = 0
#     cursor.execute("alter table imbdtitleakas AUTO_INCREMENT = 1")
#     for row in csvreader:
#         counter += 1
#         print(row)
#         # if counter == 100:
#         #     break
#         try:
#             cursor.execute("insert into imbdtitleakas(region,language) values(%s, %s);", (row[3],row[4]))
#         except mysql.connector.Error as err:
#             print("Failed creating database: {}".format(err))
#
# cnx.commit()
# cnx.close()

