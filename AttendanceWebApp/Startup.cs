using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AttendanceWebApp.Startup))]

namespace AttendanceWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
