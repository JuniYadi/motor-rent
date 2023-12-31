from ulid import ULID
from nanoid import generate
import random

def id():
    return str(ULID())

def genID(size = 6):
    return generate('123456789abcdefABCDEF', size)

def genNumber(size = 6):
    return generate('123456789', size)

def genString(size = 6):
    return generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', size)

def genRandomRangka(size = 17):
    nomor = genNumber(12)
    abjad = genString(5)

    mixed = str(nomor) + abjad
    mixed_list = list(mixed)
    
    random.shuffle(mixed_list)
    randomized_mixed = ''.join(mixed_list)
    
    return randomized_mixed

def genStockRandom():
    return random.randint(1, 15)

def genStatusRandom():
    return random.choice(['TERSEDIA', 'DIPINJAM', 'PERBAIKAN', 'RUSAK'])