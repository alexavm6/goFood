const dashboardCtrl = {};

dashboardCtrl.renderDashboard = (req, res) => {

    


    res.render('dashboard/dashboard');
};

dashboardCtrl.renderFood = (req, res) => {
    res.render('dashboard/food');
};

dashboardCtrl.renderRecipes = (req, res) => {
    res.render('dashboard/recipes');
};

dashboardCtrl.renderInventory = (req, res) => {
    res.render('dashboard/inventory');
};

dashboardCtrl.renderCategories = (req, res) => {
    res.render('dashboard/categories');
};



module.exports = dashboardCtrl;