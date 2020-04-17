# SIMRide by FYP20-S1-10



**Initial setup**

1. Install Node.js accordingly

2. Install react globally :
    ```
        npm install -g react-native-cli
    ```

3. To install Expo CLI :
    ```
        npm install -g expo-cli
    ```

4. Go to a designated location in your pc (make sure you have access to the repository):
    ```
        sudo git clone https://github.com/xshafqx/Carpool-World.git
        *input your laptop password
    ```

5. Go to your terminal :
    ```
        cd Carpool-World/Carpool-World/Carpool-World
        npm start
        w
    ```



**On your preferred editor, open the Carpool folder**

To create and push your new branch to github :
```
git pull origin
git checkout -b [name_of_your_new_branch]
git push origin [name_of_your_new_branch]
```


To see all the branches :
```
git branch -a
```


To commit changes to remote branch :
```
git status
git add .
git checkout
git commit -m "[your_message]"
git push origin [name_of_your_branch]
```


To switch branch :
```
git checkout [branch_name]
```


**Work progress**

In-Progress | Done
----------- | -----------
**BOOKING: Filter - by area/time [Shafiq doing now]** | BACKEND: Connected to Firebase 
**Design the app (UI/UX) [Vinny doing now]** | BACKEND: Registration authentication to Firebase 
USER: Set where they stay when joining the app | BACKEND: Synced database to Firebase 
BOOKING: Remove area from create a booking, add to when users join | USERS: Logging into SIMRide 
WALLET: Top-up E-Wallet | USERS: Logging out of SIMRide 
WALLET: Remove total from E-Wallet after ride | BACKEND: Send data to Firebase 
WALLET: Cash out for drivers | BACKEND: Made multiple tabs to act as pages 
WALLET: Balance low reminder | BACKEND: Retrieve data from Firebase 
WALLET: Check for wallet balance when booking ride | USERS: Edit Profile 
BOOKING: Weekly pickup scheduler (not important) | USERS: View Profile 
USERS: Rate the driver and rider (not important) | CHAT: Live chat, store chat, select user to chat with 
USERS: Transaction/booking history | USERS: View other profiles 
-- | USERS: Update password
ADMIN: Audit/log (not important) | CHAT: Stored chat history 
-- | CHAT: Retrieving chats
MAPS: Automatic route planning (fastest) | BOOKING: Create a Booking
API: MapQuest Traffic API | BOOKING: Display list of available Booking
API: MapQuest Directions API | USERS: Apply to be driver: upload license image
API: Stripe API | USERS: Apply to be driver: add driver details
-- | BOOKING: Join booking
-- | BOOKING: View My Bookings
-- | BOOKING: Cancel confirmed ride
-- | WALLET: E-Wallet page
-- | BOOKING: View created rides
-- | PERMISSIONS: Split users into roles, and define what each role can see
-- | USERS: Forgot password reset email
-- | ADMIN: review driver application
-- | BOOKING: Cancel created booking
-- | ADMIN: Ban user (blacklist user)
-- | USERS: Report user
-- | USERS: Dashboard (Maybe will add wallet balance)
-- | BOOKING: Choose to pay by cash or wallet
-- | WALLET: Set up wallet for all users
-- | BACKEND: Find a datetime picker to allow datetime comparisons in database
