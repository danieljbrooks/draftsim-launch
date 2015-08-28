#Converts .txt data file to .js

#path_to_file="C:\Users\Dan\Desktop\draft-simulator\FRF_pick_order_version2.txt"
#setname="FRF"
#path_to_images="C:/Users/Dan/Desktop/draft-simulator/Card Images/FRF/"

#path_to_file="C:\Users\Dan\Desktop\draft-simulator\FRF_lands.txt"
#setname="FRF_lands"
#path_to_images="C:/Users/Dan/Desktop/draft-simulator/Card Images/FRF/"

#path_to_file="C:\Users\Dan\Desktop\draft-simulator\dragons_pick_order_version5.txt"
#setname="DTK"
#path_to_images="C:/Users/Dan/Desktop/draft-simulator/Card Images/DTK/"

path_to_file="C:\Users\Dan\Desktop\draft-simulator\ORI_pick_order_version5.txt"
setname="ORI"
path_to_images="C:/Users/Dan/Desktop/draft-simulator/Card Images/ORI/"

import os
#not called
#Removes spaces from filenames in a directory
def remove_spaces_curdir():
  files = os.listdir(".")
  for f in files:
    os.rename(f, f.replace(' ', '_'))
    #os.rename(f, f.replace("'", ""))

#Return the cmc of a card
def get_cmc(cc1):
  cmc=0;
  for letter in cc1:
    if letter.isdigit():
      cmc+=int(letter)
    if letter=="W" or letter=="w" :
      cmc+=1
    if letter=="U" or letter=="u":
      cmc+=1
    if letter=="B" or letter=="b":
      cmc+=1
    if letter=="R" or letter=="r":
      cmc+=1
    if letter=="G" or letter=="g":
      cmc+=1
    if letter=="X" or letter=="x":
      cmc+=2
  return cmc

#Return the number of colored symbols in casting_cost_1
#If casting_cost_2 has a greater color requirement, average them
def get_colors(cc1, cc2):
  color_commit=[0,0,0,0,0]
  color_commit2=[0,0,0,0,0]

  for letter in cc1:
    if letter=="W" or letter=="w" :
      color_commit[0]+=1
    if letter=="U" or letter=="u":
      color_commit[1]+=1
    if letter=="B" or letter=="b":
      color_commit[2]+=1
    if letter=="R" or letter=="r":
      color_commit[3]+=1
    if letter=="G" or letter=="g":
      color_commit[4]+=1

  for letter in cc2:
    if letter=="W" or letter=="w" :
      color_commit2[0]+=1
    if letter=="U" or letter=="u":
      color_commit2[1]+=1
    if letter=="B" or letter=="b":
      color_commit2[2]+=1
    if letter=="R" or letter=="r":
      color_commit2[3]+=1
    if letter=="G" or letter=="g":
      color_commit2[4]+=1

  for i in range (0,5):
    if color_commit2[i]>color_commit[i]:
      color_commit[i]=(color_commit[i]+ 0.0 +color_commit2[i])/2.0
  return color_commit;

#sortcreature 0,1,2 for creature, non-creature, land
def sort_creature(type):
  sorted_type=1
  if(type=='Creature' or type=='creature'):
    sorted_type=0
  if(type=='Land'):
    sorted_type=2
  return sorted_type

#color_sort 0,1,2,3,4,5,6 for W U B R G colorless, multi
def sort_color(cc1, cc2):
  #get number of colors
  color_commit=get_colors(cc1, cc2)
  num_colors=0
  for i in range (0,5):
    if (color_commit[i]>0):
      num_colors=num_colors+1

  #mono-colored cases
  if num_colors==1:
    if (color_commit[0]>0):
      return 0
    if (color_commit[1]>0):
      return 1
    if (color_commit[2]>0):
      return 2
    if (color_commit[3]>0):
      return 3
    if (color_commit[4]>0):
      return 4
  if num_colors==0:
    return 5
  if num_colors>1:
    return 6
  #return 8 if not found
  return 7

def generate_cardlist(path_to_rankings, setname):
  #read file

  fin = open(path_to_rankings, 'r')
  fout = open(setname + ".js", 'w')

  fout.write("/* Set formation for " + setname + " */\n")
  fout.write("var "+ setname + "=[")
  ctr=0;
  for line in fin:
    ctr+=1;
    cd=line.split() #card data
    #print ctr, cd
    if len(cd) == 6:
      #fout.write("{name:\"" + cd[0] + "\", castingcost1:\"" + cd[1] + "\", castingcost2:\"" + cd[2])
      #fout.write("\", type:\"" + cd[3] + "\", rarity:\"" + cd[4] + "\", myrating:\"" + cd[5] + "\"" )
      #fout.write(", image:" + '"Images/' + setname + "/" + cd[0] + ".jpg" + '"' + "},")

      fout.write("{name:\"" + cd[0] + "\", castingcost1:\"" + cd[1] + "\", castingcost2:\"" + cd[2])
      fout.write("\", type:\"" + cd[3] + "\", rarity:\"" + cd[4] + "\", myrating:\"" + cd[5] + "\"")
      fout.write(", image:" + '"Images/' + setname + "/" + cd[0] + ".jpg" + '",' + " cmc:" +'"'+ str(get_cmc(cd[1]))+'",')
      fout.write(" colors:" + str(get_colors(cd[1], cd[2])) + ", creaturesort:" + '"'+ str(sort_creature(cd[3])) + '"' + ", colorsort:" + '"' + str(sort_color(cd[1], cd[2])) + '"' + "},")


      print("{name:\"" + cd[0] + "\", castingcost1:\"" + cd[1] + "\", castingcost2:\"" + cd[2])
      print("\", type:\"" + cd[3] + "\", rarity:\"" + cd[4] + "\", myrating:\"" + cd[5] + "\"")
      print(", image:" + '"Images/' + setname + "/" + cd[0] + ".jpg" + '",' + " cmc:" +'"'+ str(get_cmc(cd[1]))+'",')
      print(" colors:" + str(get_colors(cd[1], cd[2])) + ", creaturesort:" + '"'+ str(sort_creature(cd[3])) + '"' + ", colorsort:" + '"' + str(sort_color(cd[1], cd[2])) + '"' + "},")



      #dict[cd[0]]=Card( cd[0], cd[1], cd[2], cd[3], cd[4], str(cd[5]) )
      #print 'Added ' + cd[0] + ' to cardList'
  fout.write("];\n")
  fin.close()
  fout.close()
  print 'cardlist generated'
  return

#remove_spaces_cur_dir()
generate_cardlist(path_to_file, setname)