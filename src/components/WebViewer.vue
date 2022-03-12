<template>
  <div>
    <button @click="clickToAnnotate">Annotate</button>
    <div id="webviewer" ref="viewer"></div>
  </div>
</template>

<script>
import WebViewer from "@pdftron/webviewer";
export default {
  name: "WebViewer",
  props: {
    url: String,
  },
  //Initialize the webviewer instance in the mounted lifecycle hook
  data() {
    return {
      annotations: [
        { page: 2, x: 150, y: 150, w: 50, h: 20, id: "1" },
        { page: 1, x: 80, y: 90, w: 50, h: 20, id: "2" },
        { page: 1, x: 120, y: 120, w: 50, h: 20, id: "3" },
      ],
      webViewerInstance: {},
    };
  },
  mounted() {
    WebViewer(
      {
        path: `${process.env.BASE_URL}webviewer`,
        initialDoc: this.url,
      },
      this.$refs.viewer
    ).then((instance) => {
      this.webViewerInstance = instance;
      const { docViewer, annotManager, Annotations } = instance;
      instance.setTheme("light");
      instance.disableElements([
        "searchButton",
        "freeHandToolGroupButton",
        "eraserToolButton",
        "textToolGroupButton",
        "shapeToolGroupButton",
        "stickyToolButton",
        "freeTextToolButton",
        "signatureToolButton",
        "highlightToolButton2",
        "highlightToolButton3",
        "highlightToolButton4",
        "underlineToolButton",
        "squigglyToolButton",
        "copyTextButton",
        "linkButton",
        "textStrikeoutToolButton",
        "textSquigglyToolButton",
        "textUnderlineToolButton",
        "strikeoutToolButton",
        "annotationCommentButton",
      ]);
      docViewer.setMargin(40);

      docViewer.on("documentLoaded", () => {
        for (let annotId = 0; this.annotations.length; annotId++) {
          let annot = this.annotations[annotId];
          annotManager.setCurrentUser("Abhishek Aligh");
          const rectangleAnnot = new Annotations.RectangleAnnotation();
          rectangleAnnot.PageNumber = annot.page;
          rectangleAnnot.X = annot.x;
          rectangleAnnot.Y = annot.y;
          rectangleAnnot.Width = annot.w;
          rectangleAnnot.Height = annot.h;
          rectangleAnnot.Author = annotManager.getCurrentUser();
          rectangleAnnot.FillColor = new Annotations.Color(100, 1500, 130, 0.1);
          rectangleAnnot.StrokeColor = new Annotations.Color(0, 0, 0);
          rectangleAnnot.StrokeThickness = 5;
          rectangleAnnot.setCustomData("id", annot.id);
          annotManager.addAnnotation(rectangleAnnot);
          annotManager.redrawAnnotation(rectangleAnnot);
          const annotationList = annotManager.getAnnotationsList();
          console.log("List of annoations is as follows", annotationList);
          //To get the position of an annotation: 
          //  https://community.pdftron.com/t/how-to-get-the-position-of-annotation-relative-to-the-entire-screen/4286
          let annotationInfo = {
            pageNumber: annotationList[0].getPageNumber(),
            "y-Coordinate": annotationList[0].getY(),
            "x-Coordinate": annotationList[0].getX(),
            height: annotationList[0].getHeight(),
            width: annotationList[0].getWidth(),
          };
          console.log("annotation Info: ", annotationInfo);
        }
      });
    });
  },
  methods: {
    clickToAnnotate() {
      if (this.webViewerInstance.isElementDisabled("textToolGroupButton")) {
        this.webViewerInstance.enableElements([
          "textToolGroupButton",
          "highlightToolButton",
        ]);
      } else {
        this.webViewerInstance.disableElements([
          "textToolGroupButton",
          "highlightToolButton",
        ]);
        console.log("Annotate button clicked");
      }
    },
  },
};
// TODO : Identify how the newly created annotations are saved and populate annotation specific info such as : Coordinates, pagenumber etc...

</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>