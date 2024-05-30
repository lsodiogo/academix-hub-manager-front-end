ASYNC function FomatDate({ date }) { 

   const dateFormated = new Date(date).toLocaleDateString("fr-FR", { 
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
   });

   return dateFormated;
};

export default {
   FomatDate
};