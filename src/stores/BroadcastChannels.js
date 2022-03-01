import Vue from 'vue';

const initialData = {
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

const broadcastChannels = {
  namespaced: true,
  state: {
    isConnected: false,
    nlpBroadcastChannel: "",
    updateSfEnc: "",
  },
  getters: {
    nlpBroadcastChannel: (state) => {
      return state.nlpBroadcastChannel;
    },
    updateSfEnc: (state) => {
      return state.updateSfEnc;
    },
  },
  mutations: {
    replaceState(state, action) {
      const key = Object.keys(action)[0];
      Vue.set(state, key, action[key]);
    },
  },
  actions: {
    async postNlpBroadcast({ getters }, { type, data }) {
      const nlpBroadcastChannel = getters.nlpBroadcastChannel;
      nlpBroadcastChannel.postMessage({ type: type, data: data });
    },
    async postUpdateSfEnc({ getters }, { data }) {
      const updateSfEnc = getters.updateSfEnc;
      updateSfEnc.postMessage(data);
    },
    async syncBroadcast({ commit }, { val }) {
      await commit("replaceState", { isConnected: val });
      // console.log("medical chart connection with nlp started...", val);
    },
    async initializeNlpConnection({ commit }) {
      await commit("replaceState", {
        nlpBroadcastChannel: new window.BroadcastChannel(
          `nlp_broadcast_channel_${initialData["codingChart.Id"]}`
        ),
      });
    },
    async initializeUpdateSfEnc({ commit }) {
      await commit("replaceState", {
        updateSfEnc: new window.BroadcastChannel(
          `encounter_broadcast_channel_${initialData["codingChart.Id"]}`
        ),
      });
    },
  },
};

export { broadcastChannels };
