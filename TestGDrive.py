import os

folder = '/home/engageme/stroop-eye-tracking-exp-new/data'

# extract all csv file names from the folder
csv_name = []
screen_video_name = []
cam_video_name = []
for file in os.listdir(folder):
    if file.endswith('.csv'):
        csv_name.append(file)

all_file_names = []
for file in os.listdir(folder):
    all_file_names.append(file)

for i in range(len(csv_name)):
    screen_video = csv_name[i][:-8]+'_screen-video.mp4'
    cam_video = csv_name[i][:-8]+'_video.mp4'
    screen_video_name.append(screen_video)
    cam_video_name.append(cam_video)
    if screen_video not in all_file_names or cam_video not in all_file_names:
        print(csv_name[i][:-8]+'_screen-video.mp4')
        print(csv_name[i][:-8]+'_video.mp4')
        print(csv_name[i])
        print('----------------------')
        # try to remove the files
        try:
            os.remove(os.path.join(folder, csv_name[i]))
        except:
            print('Error: CSV file not found for ' + csv_name[i])
        try:
            os.remove(os.path.join(folder, screen_video))
        except:
            print('Error: Screen video file not found for ' + screen_video)
        try:
            os.remove(os.path.join(folder, cam_video))
        except:
            print('Error: Camera video file not found for ' + cam_video)


for file in os.listdir(folder):
    if file.endswith('.mp4'):
        if file not in screen_video_name and file not in cam_video_name:
            print(file)
            print('======================')
            # remove the file
            os.remove(os.path.join(folder, file))


# show all files which are not csv or mp4
for file in os.listdir(folder):
    if file.endswith('.csv') or file.endswith('.mp4'):
        continue
    else:
        print(file)
        print('######################')
        # remove the file
        os.remove(os.path.join(folder, file))
