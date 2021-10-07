using Microsoft.AspNetCore.Mvc;
using Modals.CoreModals;
using Modals.DataModels;
using Modals.DataViewModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateQnA.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController : Controller
    {
        private readonly IQuestionService QuestionService;
        public QuestionController(IQuestionService  service)
        {
            QuestionService = service;
        }

        [Route("getQuestions")]
        public List<QuestionDetailsView> GetQuestions()
        {
            return QuestionService.GetQuestions();
        }

        [Route("addQuestion")]
        public bool AddQuestion([FromBody]Question question)
        {
            return QuestionService.AddQuestion(question);
        }

        [Route("addView")]
        public bool AddView([FromBody] View view)
        {
            return QuestionService.AddView(view);
        }

        [Route("addVote")]
        public QuestionDetailsView UpvoteQuestion([FromBody]Vote vote)
        {
            return QuestionService.UpvoteQuestion(vote);
        }


        [Route("{questionId}")]
        public QuestionProfile GetQuestionById([FromRoute]int questionId)
        {
            return QuestionService.GetQuestionById(questionId);
        }

        [Route("questionStatus")]
        public bool ALterQuestionStatusById([FromBody] Question question)
        {
            return QuestionService.AlterQuestionStatusById(question);
        }

        [Route("reportQuestion")]
        public bool ReportQuestion([FromBody] Report report)
        {
            return QuestionService.ReportQuestion(report);
        }

    }
}
