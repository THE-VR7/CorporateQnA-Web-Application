using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataViewModels
{
    public class UserDetailsView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string ImageUrl { get; set; }
        public int QuestionsAsked { get; set; }
        public int QuestionsAnswered{ get; set; }
        public int QuestionsSolved { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
    }
}
