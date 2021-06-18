# MongoDB Lessons

## Chapter 1: What is MongoDB?

## Chapter 2: Importing, Exporting, and Querying Data

> JSON - Importing (mongoimport), Exporting (mongoexport)

> BSON - Importing (mongorestore), Exporting (mongodump).

### Example 1a -  Exporting BSON file.

* mongodump allows us to get the data we looking for in BSON form.

* mongodump --uri <Atlas Cluster URI> - Exports data in BSON.

* mongodump --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongodump --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies"
2021-06-13T13:56:51.445+0100	WARNING: On some systems, a password provided directly in a connection string or using --uri may be visible to system status programs such as `ps` that may be invoked by other users. Consider omitting the password to provide it via stdin, or using the --config option to specify a configuration file with the password.
2021-06-13T13:56:57.149+0100	writing sample_supplies.sales to dump/sample_supplies/sales.bson
2021-06-13T13:56:57.450+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T13:57:00.450+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:03.449+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:06.450+0100	[........................]  sample_supplies.sales  101/5000  (2.0%)
2021-06-13T13:57:08.039+0100	[########################]  sample_supplies.sales  5000/5000  (100.0%)
2021-06-13T13:57:08.042+0100	done dumping sample_supplies.sales (5000 documents)
mukhtar@mukhtar-Aspire-ES1-431:~$ ls
30-soc-tools  cloud_haiku  Documents  dump         IdeaProjects  Pictures  Public  SVG-images  Videos
blender_docs  Desktop      Downloads  es6-tooling  Music         Postman   snap    Templates   wget-log
mukhtar@mukhtar-Aspire-ES1-431:~$ cd dump
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ ls
admin  mongo-exercises  playground  sample_supplies
mukhtar@mukhtar-Aspire-ES1-431:~/dump$ cd sample_supplies
mukhtar@mukhtar-Aspire-ES1-431:~/dump/sample_supplies$ ls
sales.bson  sales.metadata.json
mukhtar@mukhtar-Aspire-ES1-431:~/dump/sample_supplies$ less sales.bson (to see the bson format)
```

### Example 1b - Exporting JSON file.

* mongoexport stores the JSON format of the same data.

* mongoexport --uri "<Atlas Cluster URI>" --collection=<collection name> --out=<filename>.json - Exports data in JSON.

* mongoexport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies" --collection=sales --out=sales.json.

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongoexport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.-----.mongodb.net/sample_supplies" --collection=sales --out=sales.json
2021-06-13T14:39:55.084+0100	connected to: mongodb+srv://[**REDACTED**]@cluster0.----.mongodb.net/sample_supplies
2021-06-13T14:39:56.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:57.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:58.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:39:59.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:00.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:01.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:02.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:03.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:04.366+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:05.367+0100	[........................]  sample_supplies.sales  0/5000  (0.0%)
2021-06-13T14:40:05.952+0100	[########################]  sample_supplies.sales  5000/5000  (100.0%)
2021-06-13T14:40:05.952+0100	exported 5000 records
mukhtar@mukhtar-Aspire-ES1-431:~$ less sales.json (to see the json format)
```

### Example 2a -  Importing BSON file.

* Since we just created a binary database dump, let's see if we can import it back to the source.

* mongorestore --uri "<Atlas Cluster URI>" --drop dump - Imports data in BSON dump.

* mongorestore --uri "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop dump

* mongorestore  dump/

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongorestore  dump/
2021-06-15T06:12:09.393+0100	preparing collections to restore from
2021-06-15T06:12:09.422+0100	reading metadata for sample_supplies.sales from dump/sample_supplies/sales.metadata.json
2021-06-15T06:12:10.730+0100	finished restoring sample_supplies.sales (5000 documents, 0 failures)
2021-06-15T06:12:10.730+0100	5000 document(s) restored successfully.

mukhtar@mukhtar-Aspire-ES1-431:~$ mongorestore  --drop dump/
2021-06-15T06:28:10.648+0100	preparing collections to restore from
2021-06-15T06:28:10.915+0100	reading metadata for playground.courses from dump/playground/courses.metadata.json
2021-06-15T06:28:11.114+0100	reading metadata for mongo-exercises.courses from dump/mongo-exercises/courses.metadata.json
2021-06-15T06:28:11.136+0100	reading metadata for sample_supplies.sales from dump/sample_supplies/sales.metadata.json
2021-06-15T06:28:11.237+0100	restoring playground.courses from dump/playground/courses.bson
2021-06-15T06:28:11.271+0100	no indexes to restore
2021-06-15T06:28:11.271+0100	finished restoring playground.courses (2 documents, 0 failures)
2021-06-15T06:28:11.537+0100	restoring mongo-exercises.courses from dump/mongo-exercises/courses.bson
2021-06-15T06:28:11.550+0100	no indexes to restore
2021-06-15T06:28:11.550+0100	finished restoring mongo-exercises.courses (7 documents, 0 failures)
2021-06-15T06:28:11.636+0100	restoring sample_supplies.sales from dump/sample_supplies/sales.bson
2021-06-15T06:28:12.143+0100	no indexes to restore
2021-06-15T06:28:12.143+0100	finished restoring sample_supplies.sales (5000 documents, 0 failures)
2021-06-15T06:28:12.143+0100	5009 document(s) restored successfully. 0 document(s) failed to restore.
```

Example 2b -  Importing JSON file.

* This command allows us to import a database into a MongoDB instance, which in our case is an Atlas Cluster.

* mongoimport --uri "<Atlas Cluster URI>" --drop=<filename>.json - Imports data in JSON.

* mongoimport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop sales.json

```javascript
mukhtar@mukhtar-Aspire-ES1-431:~$ mongoimport --uri="mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dkemg.mongodb.net/sample_supplies" --drop sales.json
2021-06-15T06:42:41.906+0100	no collection specified
2021-06-15T06:42:41.906+0100	using filename 'sales' as collection
2021-06-15T06:42:45.441+0100	connected to: mongodb+srv://[**REDACTED**]@cluster0.dkemg.mongodb.net/sample_supplies
2021-06-15T06:42:45.781+0100	dropping: sample_supplies.sales
2021-06-15T06:42:48.442+0100	[####....................] sample_supplies.sales	848KB/4.01MB (20.7%)
2021-06-15T06:42:51.442+0100	[#########...............] sample_supplies.sales	1.63MB/4.01MB (40.6%)
2021-06-15T06:42:54.442+0100	[##############..........] sample_supplies.sales	2.44MB/4.01MB (60.9%)
2021-06-15T06:42:57.442+0100	[########################] sample_supplies.sales	4.01MB/4.01MB (100.0%)
2021-06-15T06:42:57.727+0100	[########################] sample_supplies.sales	4.01MB/4.01MB (100.0%)
2021-06-15T06:42:57.727+0100	5000 document(s) imported successfully. 0 document(s) failed to import.
```

### MongoDB Lessons (Importing Exporting and Querying Data)
