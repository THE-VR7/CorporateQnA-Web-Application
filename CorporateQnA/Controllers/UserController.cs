using Microsoft.AspNetCore.Mvc;
using Modals.CoreModals;
using Modals.DataViewModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateQnA.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService UserService;
        public UserController(IUserService service)
        {
            UserService = service;
        }

        [Route("userView/{userId}")]
        public UserDetailsView GetUserViewById([FromRoute] string userId)
        {
            return UserService.GetUserViewById(""+userId);
        }

        [Route("all")]
        public List<UserDetailsView> GetUserDetails()
        {
            return UserService.GetUsers();
        }

        [Route("userProfile/{userId}")]
        public UserProfile GetUserProfileById([FromRoute] string userId)
        {
            return UserService.GetUserById(userId);
        }


    }
}
