using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataViewModels
{
    public class QuestionDetailsView
    {
        public int Id { get; set; }
        public int Views { get; set; }
        public DateTime CreatedOn { get; set; }
        public int Votes { get; set; }
        public int NumberOfAnswers { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string UserImage { get; set; }
        public string UserName { get; set; }
        public bool IsSolved { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }

    }
}
