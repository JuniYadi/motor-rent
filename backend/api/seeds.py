from chalicelib.db import store
from chalicelib.id import genRandomRangka
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
  }
]

for categoryMotor in categoryMotors:
  store(categoryMotor)


typeMotors = [
  {
    "pk": "TYPE_MOTORS",
    "sk": "supra",
    "ls1sk": "bebek",
    "ls2sk": "50000",
    "ls3sk": "ulid",
    "name": "Supra X 125",
    "category": "bebek",
    "price": 50000,
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "beat",
    "ls1sk": "matic",
    "ls2sk": "50000",
    "ls3sk": "ulid",
    "name": "Beat",
    "category": "matic",
    "price": 50000,
  },
  {
    "pk": "TYPE_MOTORS",
    "sk": "cbr-150-r",
    "ls1sk": "sport",
    "ls2sk": "75000",
    "ls3sk": "ulid",
    "name": "CBR 150 R",
    "category": "sport",
    "price": 75000,
  },
]

for typeMotor in typeMotors:
  id = ULID()
  typeMotor['id'] = str(id)
  typeMotor['ls3sk'] = str(id)
  store(typeMotor)


motors = [
  {
    "pk": "LISTS_MOTORS",
    "sk": "beat#random_nomor_rangka",
    "ls1sk": "ulid",
    "ls2sk": "L1234AB",
    "ls3sk": "TERSEDIA",
    "nomor_rangka": "random_nomor_rangka",
    "id": "ulid",
    "plat_nomor": "L 1234 AB",
    "status": "TERSEDIA",
  },
  {
    "pk": "LISTS_MOTORS",
    "sk": "supra#random_nomor_rangka",
    "ls1sk": "ulid",
    "ls2sk": "L2345AB",
    "ls3sk": "TERSEDIA",
    "nomor_rangka": "random_nomor_rangka",
    "id": "ulid",
    "plat_nomor": "L 2345 AB",
    "status": "TERSEDIA",
  }
]

for motor in motors:
  id = ULID()
  nomor_rangka = genRandomRangka(17)
  
  motor['ls1sk'] = str(id)
  motor['id'] = str(id)

  motor['sk'] = motor['sk'].replace('random_nomor_rangka', nomor_rangka)
  motor['nomor_rangka'] = nomor_rangka

  store(motor)