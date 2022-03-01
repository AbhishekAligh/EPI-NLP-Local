import Vue from 'vue';

const sfData = {
  memberLastName: "Doe",
  memberFirstName: "John",
  memberDOB: "8/28/1970",
  dosReview: "Previous Year & Current Year",
  codingType: "Medicare Part C & D",
  s3Url: 'https://anaphora-testing.s3.ap-south-1.amazonaws.com/E-XZ103JNS.pdf',
  webViewerPath: "/resource/Webviewer_lib",
  webViewerConfig: "/resource/Webviewer_config",
  jsonUrl: 'https://anaphora-testing.s3.ap-south-1.amazonaws.com/E-XZ103JNS.pdf',
  capCodes: "",
  chartStatus: "4",
  captureMethod:
    "Year wise by Category",
  chaseHCC: "",
  isProcessedByNlp: "true",
  validateChaseHccData: "HCC Match",
};

const nlpStore = {
  namespaced: true,
  state: {
    memberLastName: sfData.memberLastName,
    memberFirstName: sfData.memberFirstName,
    memberDOB: sfData.memberDOB,
    dosReview: sfData.dosReview,
    codingType: sfData.codingType,
    s3Url: sfData.s3Url,
    webViewerPath: sfData.webViewerPath,
    webViewerConfig: sfData.webViewerConfig,
    jsonUrl: sfData.jsonUrl,
    capCodes: sfData.capCodes,
    chartStatus: sfData.chartStatus,
    captureMethod: sfData.captureMethod,
    chaseHCC: sfData.chaseHCC,
    isProcessedByNlp: sfData.isProcessedByNlp,
    validateChaseHccData: sfData.validateChaseHccData,
    validationScope: sfData.validationScope,
    allowClicktoCode: sfData.allowClicktoCode,
    codingChartId: sfData["codingChart.Id"]
  },
  getters: {
    memberLastName: state => {
      return state.memberLastName;
    },
    memberFirstName: state => {
      return state.memberFirstName;
    },
    memberDOB: state => {
      return state.memberDOB;
    },
    dosReview: state => {
      return state.dosReview;
    },
    codingType: state => {
      return state.codingType;
    },
    s3Url: state => {
      return state.s3Url;
    },
    webViewerPath: state => {
      return state.webViewerPath;
    },
    getChartClientAuditRows: state => {
      return state.chartClientAuditRows;
    },
    webViewerConfig: state => {
      return state.webViewerConfig;
    },
    jsonUrl: state => {
      return state.jsonUrl;
    },
    capCodes: state => {
      return state.capCodes;
    },
    chartStatus: state => {
      return state.chartStatus;
    },
    captureMethod: state => {
      return state.captureMethod;
    },
    chaseHCC: state => {
      return state.chaseHCC;
    },
    isProcessedByNlp: state => {
      return state.isProcessedByNlp;
    },
    validateChaseHccData: state => {
      return state.validateChaseHccData;
    },
    validationScope: state => {
      return state.validationScope;
    },
    allowClicktoCode: state => {
      return state.allowClicktoCode;
    },
    sfEncounters: state => {
      return state.sfEncounters;
    },
    codingChartId: state => {
      return state.codingChartId;
    }
  },
  mutations: {
    replaceState (state, action) {
      const key = Object.keys(action)[0];
      Vue.set(state, key, action[key]);
    }
  },
  actions: {
    async updateSfEncounters ({ commit }, { val }) {
      await commit("replaceState", { sfEncounters: val });
      console.log("Salesforce Encounters Updated...", val);
    },
    async setCapCodes ({ commit }, { val }) {
      await commit("replaceState", { capCodes: val });
      console.log("Cap Codes Updated...", val);
    },
  }
};

export {
  nlpStore,
};