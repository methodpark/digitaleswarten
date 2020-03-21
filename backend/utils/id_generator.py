import random
import time
from hashlib import sha1

random.seed()

WORDLIST = {
    'adjective': [
        'angenehm', 'attraktiv', 'aufmerksam', 'bunt', 'blau', 'charmant',
        'dankbar', 'edel', 'frei', 'gelb', 'glatt', 'hell', 'ideal', 'jung',
        'leicht', 'lieb', 'luftig', 'mutig', 'nah', 'neu', 'offen', 'poetisch',
        'rein', 'rund', 'sicher', 'treu', 'wach', 'warm', 'weich', 'zart',
        'zentral', 'zivil'
    ],
    'noun': [
        'amulett', 'arm', 'ball', 'baum', 'dach', 'eimer', 'engel', 'film',
        'foto', 'freiheit', 'haus', 'insel', 'kugel', 'liebe', 'mutter',
        'maus', 'nase', 'natur', 'obst', 'orgel', 'papier', 'quelle', 'radio',
        'ritter', 'sand', 'stein', 'uhr', 'vater', 'vogel', 'wasser', 'zahn'
    ],
    'verb': [
        'atmen', 'baden', 'bilden', 'danken', 'deuten', 'essen', 'haben',
        'heilen', 'hoffen', 'jubeln', 'kreisen', 'lachen', 'leben', 'leuchten',
        'loben', 'lohnen', 'malen', 'mischen', 'ordnen', 'planen', 'pfeifen',
        'reden', 'rollen', 'sehen', 'stehen', 'teilen', 'trinken', 'wollen',
        'zelten'
    ]
}

def generate_place_id():
    """
    Returns:
        - String: Human-readable id phrase
    """
    return random.choice(WORDLIST['adjective']) + \
           random.choice(WORDLIST['noun']) + \
           random.choice(WORDLIST['verb'])


def generate_queue_id(queue_name):
    hasher = sha1()
    hasher.update(queue_name.encode('utf-8'))
    name_hash = hasher.hexdigest()[:4] 
    time_stamp = str(int(time.time()))[-2:]
    return name_hash + time_stamp
