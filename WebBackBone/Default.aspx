<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="holistic_ui.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="holistic.version2">
<head runat="server">
    <title></title>
    <style>
        body {
            padding: 0 !important;
            margin: 0;
        }

        ​.dc {
            padding: 100px;
            padding-left: 0;
        }

        hr {
            margin: 0;
        }

        .menu-item {
            height: 45px;
            line-height: 45px;
            border-radius: 0 25px 25px 0;
            vertical-align: central;
            cursor: pointer;
        }

            .menu-item span {
                line-height: inherit;
                padding-left: 15px;
            }

            .menu-item:hover {
                background-color: rgba(240,240,240, 0.65);
            }

            .menu-item.active {
                background-color: rgba(0, 148, 255, 0.15);
            }

        ::-webkit-scrollbar {
            width: 0.5em;
            height: 0.5em;
        }

        ::-webkit-scrollbar-button {
            background: #FFF;
            width: 0;
            height: 0;
        }

        ::-webkit-scrollbar-track-piece {
            background: #FFF;
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.35);
        }
    </style>
</head>
<body ng-controller="homeController as ctrl">
    <div>
        <div class="dc">
            <div ng-style="ctrl.layout.styles.leftSide">
                <div class="dc" style="height: 50px; padding-left: 15px;">
                    <ui-circle size="50px" color="#354183" fcolor="#FFF">H</ui-circle>
                    <span style="padding-left: 10px; font-size: 20px;">Holistic</span>
                </div>
            </div>
            <div ng-style="ctrl.layout.styles.rightSide">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-8">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>
                                <input type="text" value="" class="form-control" />
                            </div>
                        </div>
                        <div ng-switch="Credential.authorize" class="col-4 text-right" style="line-height: 40px;">
                            <div ng-switch-when="true">
                                <ui-circle size="30px" title="{{Credential.display_name}}">
                                    <i class="fa fa-user"></i>
                                </ui-circle>
                            </div>
                            <div ng-switch-when="false">
                                <a ng-click="RouteState('signin')">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dc">
            <div ng-style="ctrl.layout.styles.leftSide">
                <div style="padding-left: 15px; margin: 12px 0;">
                    <button class="btn btn-default">New</button>
                </div>
                <div class="menu-item" ng-repeat="x in ctrl.Menus"
                    ng-class="{'active': $index===ctrl.ActiveMenu}"
                    ng-init="ctrl.ActiveMenu = 0"
                    ng-click="ctrl.ActiveMenu = $index; RouteState('panel')">
                    <span>
                        <ui-circle size="30px">{{x.label.substr(0, 1).toUpperCase()}}</ui-circle>
                        {{x.label}}
                    </span>
                </div>
            </div>
            <div ng-style="ctrl.layout.styles.rightSide" style="vertical-align: top;">
                <div>
                    <h3>Home / Content</h3>
                    <hr />
                </div>
                <div style="min-width: 800px;" ui-view></div>
            </div>
        </div>
    </div>
</body>
</html>
