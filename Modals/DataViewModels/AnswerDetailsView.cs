using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataViewModels
{
    public class AnswerDetailsView
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Description { get; set; }
        public bool IsBestSolution { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }

    }
}
