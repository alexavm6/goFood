const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
    res.render('info/about');
};

indexCtrl.renderContact = (req, res) => {
    res.render('info/contact');
};

indexCtrl.renderRates = (req, res) => {
    res.render('info/rates');
};

indexCtrl.renderSteps = (req, res) => {
    res.render('info/steps');
};

module.exports = indexCtrl;