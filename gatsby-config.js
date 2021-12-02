module.exports = {
  siteMetadata: {
    title: "Broken Engineers Lab-3",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: require('./senior-design-lab-3-d6e2e-firebase-adminsdk-89bhl-2edaa5a9c3.json'),
        types: [
          {
            type: "Poll",
            collection: "Polls",
            map: doc => ({
              deadline: doc.deadline,
              entTime: doc.endTime,
              invite: doc.invite,
              invitees: doc.invitees,
              isPublished: doc.isPublished,
              location: doc.location,
              notes: doc.notes,
              numBlocks: doc.numBlocks,
              restrictNumParticipants: doc.restrictNumParticipants,
              restrictSlots: doc.restrictSlots,
              sessionTime: doc.sessionTime,
              startDate: doc.startDate,
              startTime: doc.startTime,
              timeZone: doc.timeZone,
              title: doc.title,
            })
          }
        ]
      }
    }
  ],
};
