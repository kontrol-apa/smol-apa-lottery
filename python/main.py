import hashlib
import json


def get_holder_list(contender_list_file):
    with open(contender_list_file, 'r') as holdersList:
        return json.load(holdersList)


def get_winners(seed: str, contender_list_file, target_number):
    winner_list = []
    winner_dict = {}
    holder_list = get_holder_list(contender_list_file)
    random_indexes_list = get_random_indices(seed, len(holder_list),target_number)
    print("Total Holder (Marketplace not taken into account): ", len(holder_list))
    for i in random_indexes_list:
        holder_address = holder_list[i]
        if holder_address in winner_dict:
            continue
        else:
            winner_dict[holder_address] = 1
            winner_list.append(holder_address)
    check_for_duplicates(winner_list)
    return winner_list

    

def check_for_duplicates(winners: list):
    duplicate_list = []
    unique_list = []
    for winner in winners:
        addy = winner
        if addy in unique_list:
            print("duplicate found, FIX IT: ", addy)
            duplicate_list.append(addy)
        else:
            unique_list.append(addy)
    print("total unique addresses: ", len(unique_list))
    return duplicate_list
    


def get_random_indices(a: str, length, target_list_len):
    seed = str.encode(a)
    random_indices = []
    duplicate_dict = {}
    while len(random_indices) < target_list_len:
        h = hashlib.new('sha256')
        h.update(seed)
        r = h.digest()
        seed = r  # use the hash as the next seed
        index = int(r.hex(), base=16) % length
        if index in duplicate_dict:
            continue
        else:
            duplicate_dict[index] = True
        random_indices.append(index)  
    return random_indices


APA_winners = get_winners("fad98cb951024f07f0c8c0976c2c4139e3de8fb5727e9317d046391141f2d187", '../APAContenders.json',51) # account for 1 duplicate
APAGal_winners = get_winners("fad98cb951024f07f0c8c0976c2c4139e3de8fb5727e9317d046391141f2d187", '../APAGalContenders.json',10)
winners = APA_winners + APAGal_winners
duplicates = check_for_duplicates(winners)
for d in duplicates:
    winners.remove(d)
if not check_for_duplicates(winners):
    print("All unique")
with open("winners.txt", 'w') as f:
    for addy in winners:
        f.write(addy + '\n')
    

