from faker import Faker
fake = Faker()
import pymongo
def random_hospital():
    return fake.company()
#write a python script to generate facility data based on the following format:
# {
#   "PartitionKey": "String",
#   "RowKey": "String",
#   "Timestamp": "Datetime",
#   "FacilityID": "String",
#   "Name": "String",
#   "ShortName": "String",
#   "Address1": "String",
#   "Address2": "String",
#   "City": "String",
#   "State": "String",
#   "Zip": "String",
#   "TimeZone": "String",
#   "Country": "String",
#   "Coordinates": "String",
#   "Phone": "String",
#   "PrimaryContact": "String",
#   "Product": "String",
#   "CMSVersion": "String",
#   "Status": "String",
#   "ServiceStatus": "String",
#   "ServiceDetail": "String",
#   "ServiceHistory": "String",
#   "LastRecordDT": "String",
#   "UpdateFromDT": "String",
#   "StartQueue": "String",
#   "Dirty": "Boolean",
#   "Locked": "Boolean",
# }
# Here is an example of a facility data:
# {
#   "PartitionKey": "CAVN001",
#   "RowKey": "",
#   "FacilityID": "CAVN001",
#   "Name": "California Ventilator Hospital",
#   "ShortName": "Vent Hospital",
#   "Address1": "101 Highway Drive",
#   "Address2": "",
#   "City": "San Diego",
#   "State": "CA",
#   "Zip": "92078",
#   "TimeZone": "PST",
#   "Country": "USA",
#   "Coordinates": "{'lat': 12.34567890, 'lon': 12.34567890}",
#   "Phone": "000-000-0000",
#   "PrimaryContact": "1234567890",
#   "Product": "REA",
#   "CMSVersion": "",
#   "Status": "",
#   "ServiceStatus": "",
#   "ServiceDetail": "",
#   "ServiceHistory": "[[“group”, “id”, “2024-05-22T21:43:50.874Z”, “null”]]",
#   "LastRecordDT": "",
#   "UpdateFromDT": "",
#   "StartQueue": "",
#   "Dirty": false,
#   "Locked": false
# }

def generate_facility_data(count):
    facility_data = []
    for i in range(count):
        name = random_hospital()
        facility = {
            "PartitionKey": "CAVN" + str(i) if i > 99 else ("CAVN0" + str(i) if i > 9 else "CAVN00" + str(i)),
            "RowKey": "",
            "FacilityID": "CAVN" + str(i) if i > 99 else ("CAVN0" + str(i) if i > 9 else "CAVN00" + str(i)),
            "Name": name,
            "ShortName": name[:10],
            "Address1": fake.street_address(),
            "Address2": "",
            "City": fake.city(),
            "State": fake.state_abbr(),
            "Zip": fake.zipcode(),
            "TimeZone": "PST",
            "Country": "USA",
            "Coordinates": "{'lat': 12.34567890, 'lon': 12.34567890}",
            "Phone": "000-000-0000",
            "PrimaryContact": "1234567890",
            "Product": "REA",
            "CMSVersion": "",
            "Status": "",
            "ServiceStatus": "",
            "ServiceDetail": "",
            "ServiceHistory": "[[“2024-05-22T21:43:50.874Z”, “null”]]",
            "LastRecordDT": "",
            "UpdateFromDT": "",
            "StartQueue": "",
            "Dirty": False,
            "Locked": False
        }
        facility_data.append(facility)
    return facility_data
  
#put this data in mongodb collection called facilities and database called configs
def insert_facility_data(facility_data):
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["configs"]
    facilities = db["Facility"]
    result = facilities.insert_many(facility_data)
    return result.inserted_ids
  
#generate 100 facility data
facility_data = generate_facility_data(100)
#insert the facility data into the database
insert_facility_data(facility_data)
  
  
#create a script to create a random name for a hospital