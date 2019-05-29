"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var orientation_service_1 = require("./orientation.service");
var OrientationModule = /** @class */ (function () {
    function OrientationModule() {
    }
    OrientationModule = __decorate([
        core_1.NgModule({
            providers: [
                orientation_service_1.Orientation
            ]
        })
    ], OrientationModule);
    return OrientationModule;
}());
exports.OrientationModule = OrientationModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZW50YXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3JpZW50YXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLDZEQUFvRDtBQU9wRDtJQUFBO0lBQStCLENBQUM7SUFBbkIsaUJBQWlCO1FBTDdCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCxpQ0FBVzthQUNkO1NBQ0osQ0FBQztPQUNXLGlCQUFpQixDQUFFO0lBQUQsd0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztBQUFuQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSBcIi4vb3JpZW50YXRpb24uc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIE9yaWVudGF0aW9uXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcmllbnRhdGlvbk1vZHVsZXt9Il19