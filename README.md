# Tablecheck Frontend Takehome

This is the frontend application for the Tablecheck SWE take-home assignment, built with Next.js and React. Follow the steps below to clone, set up, and run the application locally.

## Installation & Set Up

NOTE: 
Make sure you have the following installed on your machine:

- Node.js (v18 and up)
- Npm (v8 and up)
- Npx (v10 and up)

```bash
git clone https://github.com/SandraBayabos/tablecheck-swe-takehome-fe.git
cd tablecheck-swe-takehome-fe
npm install
npm run dev
```

You may now visit the app on ([http://localhost:3001](http://localhost:3001)).

## Built With:

- Next.js
- React.js
- Typescript
- TailwindCSS

# Explanation on Infrastracture & Architecture

## useQuery for Polling Current Party's Queue Position

I used React Query's `useQuery` hook to poll the backend every 10 seconds in order to detect the current party's position in the queue.  

I wanted to make use of `useQuery's` inbuilt state management, which I used to cache the current party's position in the queue. I also used it to cache the current party name as well for use in different pages and components. Using useQuery also focuses more on server state which is more crucial in this app due to the frequent updating of the party's queue position, rather than using traditional state management like Redux or ContextAPI.

`Websocket` would also have been suitable for this application, however due to the nature of the assignment I wanted to try something new as I had previously used Rail's Action Cable coupled with `socket.io` on a React.js frontend to build a chat app before. Also, polling is suitable in the context of a restaurant queue app because for a restaurant, queue position updates wouldn't be happening every second, whereas websockets would be more suitable when real-time updates are more crucial.

## Cookies

Since I'm using `axios` for making api calls, adding in the `withCredentials: true` to pass in the cookies to be verified by the backend.

By using cookies to determine the current party, the user is able to check their queue position even if they refresh the page or open up a new tab, as per the requirements. Using cookies also prevents a current party from starting a new party and getting appended to the queue and causing a block in the queue for subsequent parties.

However, I have also included a Start New Queue button if a user is `in_queue`, `pending_check_in` or already `seated`, in case users need to re-do their party for any reason, such as adding people to their party or re-visiting the same restaurant on the same day. This will call the `/api/parties/delete` api on the backend, delete the current party from the server, clear the cookies and redirect the user to the start page where they can submit a new party.