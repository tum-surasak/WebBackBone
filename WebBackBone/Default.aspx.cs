using holistic_ui.App_Start.Bundle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace holistic_ui
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.StylesRender("~/bundle/bootstrap", "~/bundle/fontawesome");
            this.ScriptsRender("~/bundle/angular");
        }
    }
}