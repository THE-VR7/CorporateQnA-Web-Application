using Microsoft.AspNetCore.Mvc;
using Modals.DataModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateQnA.Controllers
{
    [Route("api/answer")]
    [ApiController]
    public class AnswerController : Controller
    {
        private readonly IAnswerService AnswerService;
        public AnswerController(IAnswerService service)
        {
            AnswerService = service;
        }

        [Route("add")]
        public bool AddAnswer([FromBody]Answer answer)
        {
            return AnswerService.AddAnswer(answer);
        }

        [Route("like")]
        public bool LikeAnswer([FromBody]Like like)
        {
            return AnswerService.LikeAnswer(like);
        }

        [Route("dislike")]
        public bool DislikeAnswer([FromBody] Like like)
        {
            return AnswerService.DislikeAnswer(like);
        }

        [HttpPost]
        [Route("bestSolution")]
        public bool BestSolution([FromBody] int answerId)
        {
            return AnswerService.MarkAsBestAnswer(answerId);
        }

    }
}
