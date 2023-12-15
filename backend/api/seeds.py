from chalicelib.db import store
from chalicelib.id import genRandomRangka, genStockRandom, genStatusRandom, genNumber, genString
from ulid import ULID

categoryMotors = [
  {
    "pk": "CATEGORY_MOTORS",
    "sk": "bebek",
    "ls1sk": "10",
    "ls2sk": "50000",
    "ls3sk": "1",
    "name": "Bebek",
    "stocks": 10,
    "price_start": 50000,
    "id": 1,
    "description": "Motor Cup (Bebek), Sangat cocok untuk Anda yang ingin pergi ke tempat yang tidak terlalu jauh dan hemat bahan bakar.",
    "image": "/img/motorbike/bebek.png",
  },
  {
    "pk": "CATEGORY_MOTORS",
    "sk": "matic",
    "ls1sk": "10",
    "ls2sk": "50000",
    "ls3sk": "2",
    "name": "Matic",
    "stocks": 10,
    "price_start": 50000,
    "id": 2,
    "description": "Motor Matic, Sangat cocok untuk Anda yang ingin mengendarai motor dengan mudah dan nyaman.",
    "image": "/img/motorbike/matic.png",
  },
  {
    "pk": "CATEGORY_MOTORS",
    "sk": "sport",
    "ls1sk": "10",
    "ls2sk": "75000",
    "ls3sk": "3",
    "name": "Sport",
    "stocks": 10,
    "price_start": 75000,
    "id": 3,
    "description": "Motor Sport, Sangat cocok untuk Anda yang ingin pergi dengan jarak yang jauh dan ingin merasakan sensasi berkendara yang cepat.",
    "image": "/img/motorbike/sport.png",
  }
]

for categoryMotor in categoryMotors:
  store(categoryMotor)


typeMotors = [
  {
    "pk": "TYPE_MOTORS",
    "sk": "supra-x-125-fi",
    "ls1sk": "bebek",
    "ls2sk": "50000",
    "ls3sk": "ulid",
    "name": "Supra X 125 FI",
    "category": "bebek",
    "price": 60000,
    "image": "/img/motorbike/supra-x-125-fi.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "beat",
    "ls1sk": "matic",
    "ls2sk": "50000",
    "ls3sk": "ulid",
    "name": "BeAT",
    "category": "matic",
    "price": 60000,
    "image": "/img/motorbike/beat.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "vario-125",
    "ls1sk": "matic",
    "ls2sk": "60000",
    "ls3sk": "ulid",
    "name": "Vario 125",
    "category": "matic",
    "price": 70000,
    "image": "/img/motorbike/vario-125.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "vario-160",
    "ls1sk": "matic",
    "ls2sk": "70000",
    "ls3sk": "ulid",
    "name": "Vario 160",
    "category": "matic",
    "price": 80000,
    "image": "/img/motorbike/vario-160.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "pcx-160",
    "ls1sk": "matic",
    "ls2sk": "85000",
    "ls3sk": "ulid",
    "name": "PCX 160",
    "category": "matic",
    "price": 99000,
    "image": "/img/motorbike/pcx-160.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "cb150-verza",
    "ls1sk": "sport",
    "ls2sk": "70000",
    "ls3sk": "ulid",
    "name": "CB150 Verza",
    "category": "sport",
    "price": 70000,
    "image": "/img/motorbike/cb150-verza.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "cb150r-streetfire",
    "ls1sk": "sport",
    "ls2sk": "100000",
    "ls3sk": "ulid",
    "name": "CB150R Streetfire",
    "category": "sport",
    "price": 100000,
    "image": "/img/motorbike/cb150r-streetfire.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "crf150l",
    "ls1sk": "sport",
    "ls2sk": "125000",
    "ls3sk": "ulid",
    "name": "CRF150L",
    "category": "sport",
    "price": 125000,
    "image": "/img/motorbike/crf150l.png",
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "cbr-150r",
    "ls1sk": "sport",
    "ls2sk": "150000",
    "ls3sk": "ulid",
    "name": "CBR 150R",
    "category": "sport",
    "price": 150000,
    "image": "/img/motorbike/cbr-150r.png",
  },
]

for typeMotor in typeMotors:
  id = ULID()
  typeMotor['id'] = str(id)
  typeMotor['ls3sk'] = str(id)
  store(typeMotor)


  for i in range(genStockRandom()):

    motor = {
      "pk": "LISTS_MOTORS",
      "sk": "type_motor#random_nomor_rangka",
      "ls1sk": "ulid",
      "ls2sk": "L1234AB",
      "ls3sk": "TERSEDIA",
      "type_motor": "type_motor",
      "nomor_rangka": "random_nomor_rangka",
      "id": "ulid",
      "plat_nomor": "L 1234 AB",
      "status": "TERSEDIA",
    }

    # Create Min Stocks
    id = ULID()
    nomor_rangka = genRandomRangka(17)
    status = genStatusRandom()
    nomorPlat = 'L ' + genNumber(4) + ' ' + genString(2)
    
    motor['ls1sk'] = str(id)
    motor['id'] = str(id)

    motor['ls2sk'] = nomorPlat.replace(' ', '')
    motor['plat_nomor'] = nomorPlat

    motor['sk'] = motor['sk'].replace('type_motor', typeMotor['sk']).replace('random_nomor_rangka', nomor_rangka)
    motor["type_motor"] = typeMotor['sk']
    motor['nomor_rangka'] = nomor_rangka

    motor['ls3sk'] = str(status)
    motor['status'] = str(status)

    store(motor)
