using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PetaPoco;
using SimpleInjector;
using Services.Interfaces;
using Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Modals.Mappings;
using AutoMapper;
using Modals.AuthenticationModals;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using PetaPoco.Providers;

namespace CorporateQnA
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            // Set to false. This will be the default in v5.x and going forward.
            container.Options.ResolveUnregisteredConcreteTypes = false;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private Container container = new SimpleInjector.Container();


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CorporateQnA", Version = "v1" });
            });

            IConfiguration connString = Configuration.GetSection("ApplicationSettings");
            // Application Settings
            //services.Configure<ApplicationSettings>(connString);

            services.AddDbContext<AuthenticationDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<AuthenticationDbContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            });

            services.AddAutoMapper(typeof(MapperProfile));

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });

            // Sets up the basic configuration that for integrating Simple Injector with
            // ASP.NET Core by setting the DefaultScopedLifestyle, and setting up auto
            // cross wiring.
            services.AddSimpleInjector(container, options =>
            {
                // AddAspNetCore() wraps web requests in a Simple Injector scope and
                // allows request-scoped framework services to be resolved.
                options.AddAspNetCore()

                    // Ensure activation of a specific framework type to be created by
                    // Simple Injector instead of the built-in configuration system.
                    // All calls are optional. You can enable what you need. For instance,
                    // ViewComponents, PageModels, and TagHelpers are not needed when you
                    // build a Web API.
                    .AddControllerActivation()
                    .AddViewComponentActivation()
                    .AddPageModelActivation()
                    .AddTagHelperActivation();

                // Optionally, allow application components to depend on the non-generic
                // ILogger (Microsoft.Extensions.Logging) or IStringLocalizer
                // (Microsoft.Extensions.Localization) abstractions.
                //options.AddLogging();
                //options.AddLocalization();
                //                options.AutoCrossWireFrameworkComponents = true;
            });
            InitializeContainer();
        }

        // Container to contain Interfaces with its implementations
        private void InitializeContainer()
        {

            //var conStr = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;

            // Register petapoco with simpleInjector
            container.Register<Database>(() =>
            new Database(Configuration["ConnectionStrings:DefaultConnection"].ToString(),
            new SqlServerDatabaseProvider()),
            Lifestyle.Scoped);

            //container.RegisterSingleton(() => GetMapper(container));

            // Add application services. For instance:
            container.Register<IQuestionService, QuestionService>();
            container.Register<IAnswerService, AnswerService>();
            container.Register<ICategoryService, CategoryService>();
            container.Register<IUserService, UserService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            // UseSimpleInjector() finalizes the integration process.
            app.UseSimpleInjector(container);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CorporateQnA v1"));
            }
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();
            
            

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Always verify the container
            container.Verify();
        }
    }
}
