export const commentsFakeResponse = {
  comments: [
    {
      id: 1,
      createdAt: "2016-02-18T03:22:56.637Z",
      updatedAt: "2016-02-18T03:22:56.637Z",
      body: "It takes a Jacobian",
      author: {
        username: "jake",
        bio: "I work at statefarm",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false,
      },
    },
    {
      id: 2,
      createdAt: "2016-02-18T03:23:56.637Z",
      updatedAt: "2016-02-18T03:23:56.637Z",
      body: "It takes a Jacobian2",
      author: {
        username: "jake2",
        bio: "I work at statefarm2",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false,
      },
    },
  ],
};

export const commentFakeResponse = {
  comment: {
    id: 0,
    createdAt: "2016-02-18T03:12:56.637Z",
    updatedAt: "2016-02-18T03:12:56.637Z",
    body: "new comment",
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://i.stack.imgur.com/xHWG8.jpg",
      following: false,
    },
  },
};
