using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace holistic_ui.App_Start.Bundle
{
    public class Bundle
    {
        public List<StyleBundle> StylesResource { get; set; }
        public List<ScriptBundle> ScriptsResource { get; set; }
        public Bundle()
        {
            this.StylesResource = new List<StyleBundle>();
            this.StylesResource.Add(new StyleBundle("~/bundle/bootstrap")
                .Include(
                "~/Content/bootstrap.min.css"
                ));
            this.StylesResource.Add(new StyleBundle("~/bundle/fontawesome")
                .Include(
                "~/Content/font-awesome.min.css"
                ));

            this.ScriptsResource = new List<ScriptBundle>();
            this.ScriptsResource.Add(new ScriptBundle("~/bundle/angular")
                .Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-ui-router.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/angular-animate.min.js",
                "~/src/idev.component.js",
                "~/src/providers/authen.provider.js",
                "~/src/providers/provider.register.js",
                "~/src/app.config.js",
                "~/src/app.js"
                ));
        }
    }
    public static class Scripts
    {

        public static void ScriptsRender(this Page _self, params string[] path)
        {
            Type t = typeof(Page);
            Bundle bundle = new Bundle();
            foreach (ScriptBundle b in bundle.ScriptsResource.Where(x => path.Contains(x.Name)))
            {
                var scripts = b.ResourcePath;
                foreach (var file_path in scripts)
                //_self.ClientScript.RegisterClientScriptInclude(file_path, file_path);
                //_self.ClientScript.RegisterClientScriptResource(typeof(Scripts), file_path);
                {
                    string tag_script = string.Format(@"<script type='text/javascript' src='{0}'></script>", file_path.Replace("~/", ""));
                    LiteralControl script = new LiteralControl(tag_script);
                    _self.Header.Controls.AddAt(_self.Header.Controls.Count, script);
                    //_self.ClientScript.RegisterClientScriptResource(_self.GetType(), file_path);
                }

            }
        }
    }
    public static class Styles
    {

        public static void StylesRender(this Page _self, params string[] path)
        {
            Type t = typeof(Page);
            Bundle bundle = new Bundle();
            foreach (StyleBundle b in bundle.StylesResource.Where(x => path.Contains(x.Name)))
            {
                var styles = b.ResourcePath;
                //for (int index = 0; index < styles.Count; index++)
                foreach(string style in styles)
                {
                    HtmlLink css = new HtmlLink();
                    css.Attributes.Add("rel", "stylesheet");
                    css.Attributes.Add("href", style);
                    _self.Header.Controls.Add(css);
                }
            }

        }
    }
    public class ScriptBundle
    {
        string application_path = HttpContext.Current.Server.MapPath("");
        public string Name { get; }
        public List<string> ResourcePath { get; }
        public ScriptBundle(string package_name)
        {
            this.Name = package_name;
            this.ResourcePath = new List<string>();
        }
        public ScriptBundle Include(params string[] path)
        {
            foreach (var file_path in path)
            {
                string physical_path = PathExtension.PhysicalPath(file_path);
                FileInfo file = new FileInfo(physical_path);
                if (file.Exists)
                    this.ResourcePath.Add(file_path);
                else
                    throw new Exception("File not found.");
            }

            return this;
        }
        public ScriptBundle IncludeDirectory(string directoryVirtualPath, string searchPattern, bool searchSubdirectories)
        {
            string server_map_path = HttpContext.Current.Server.MapPath(directoryVirtualPath);
            DirectoryInfo resource_path = new DirectoryInfo(server_map_path);

            foreach (var file in resource_path.GetFiles(searchPattern, searchSubdirectories ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly))
            {
                this.ResourcePath.Add(file.FullName.Replace(application_path, ""));
            }

            return this;
        }
    }
    public class StyleBundle
    {
        string application_path = HttpContext.Current.Server.MapPath("");
        public string Name { get; }
        public List<string> ResourcePath { get; }
        public StyleBundle(string package_name)
        {
            this.Name = package_name;
            this.ResourcePath = new List<string>();
        }
        public StyleBundle Include(params string[] path)
        {
            foreach (var file_path in path)
            {
                string physical_path = PathExtension.PhysicalPath(file_path);
                FileInfo file = new FileInfo(physical_path);
                if (file.Exists)
                    this.ResourcePath.Add(file_path);
                else
                    throw new Exception("File not found.");
            }
            return this;
        }
        public StyleBundle IncludeDirectory(string directoryVirtualPath, string searchPattern, bool searchSubdirectories)
        {
            
            string server_map_path = HttpContext.Current.Server.MapPath(directoryVirtualPath);
            DirectoryInfo resource_path = new DirectoryInfo(server_map_path);

            foreach (var file in resource_path.GetFiles(searchPattern, searchSubdirectories ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly))
            {
                this.ResourcePath.Add(file.FullName.Replace(application_path, ""));
            }

            return this;
        }
    }
    public static class PathExtension {
        public static string PhysicalPath(string relative_path) {
            return HttpContext.Current.Server.MapPath(relative_path);
        }
    }
}