export const TRANSMITTER = {
  serialNumber: "",
  room: "",
  assetTag: "",
  bracket: "",
  configured: false,
  labeled: false,
  tested: false,
  qualityAssured: false,
  QA: [
    {
      QA: "Monitor Both",
      date: "",
      verified: false,
    },
    {
      QA: "Both Alarm",
      date: "",
      verified: false,
    },
    {
      QA: "Both Disconnect",
      date: "",
      verified: false,
    },
    {
      QA: "Both Clear",
      date: "",
      verified: false,
    },
  ],
};

export const CMS = {
  CMSID: "",
  assembled: false,
  configured: false,
  wifiMacAddress: "",
  ethernetMacAddress: "",
  assetID: "",
  frequency: "",
  qualityAssured: false,
  QA: [
    {
      QA: "QA1",
      date: "",
      verified: false,
    },
    {
      QA: "QA2",
      date: "",
      verified: false,
    },
  ],
};

export const MED = {
  MEDID: "",
  configured: false,
  assetID: "",
  completionDue: "",
  qualityAssured: false,
  QA: [
    {
      QA: "QA1",
      date: "",
      verified: false,
    },
    {
      QA: "QA2",
      date: "",
      verified: false,
    },
  ],
};

export const QA = {
  QA: "",
  date: "",
  verified: false,
};

export const QAFunct = (_question, _date = "", _verified = false) => {
  return {
    QA: _question,
    date: _date,
    verified: _verified,
  };
};
