from sklearn.model_selection import GridSearchCV

from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

try:
    from xgboost import XGBClassifier, XGBRegressor
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False


def tune_best_model(best_model_name,
                    pipeline_result,
                    task_type):

    if isinstance(task_type, dict):
        task_type = task_type["task_type"]

    task_type = task_type.strip().lower()

    X_train = pipeline_result["X_train"]
    y_train = pipeline_result["y_train"]

    preprocessor = pipeline_result["preprocessor"]

    X_train = preprocessor.fit_transform(X_train)

    scoring = "accuracy" if task_type == "classification" else "r2"

    # -------------------------
    # Classification
    # -------------------------

    if best_model_name == "Logistic Regression":

        model = LogisticRegression(max_iter=1000)

        params = {
            "C": [0.01,0.1,1,10],
            "solver": ["lbfgs","liblinear"]
        }

    elif best_model_name == "Decision Tree":

        model = DecisionTreeClassifier(random_state=42)

        params = {
            "max_depth":[None,5,10,20],
            "min_samples_split":[2,5,10],
            "criterion":["gini","entropy"]
        }

    elif best_model_name == "Random Forest":

        model = RandomForestClassifier(random_state=42)

        params = {
            "n_estimators":[100,200,300],
            "max_depth":[None,10,20],
            "min_samples_split":[2,5],
            "criterion":["gini","entropy"]
        }

    elif best_model_name == "XGBoost" and XGBOOST_AVAILABLE:

        model = XGBClassifier(
            eval_metric="mlogloss",
            random_state=42
        )

        params = {

            "learning_rate":[0.01,0.1],

            "max_depth":[3,5,7],

            "n_estimators":[100,200]

        }

    # -------------------------
    # Regression
    # -------------------------

    elif best_model_name == "Linear Regression":

        model = LinearRegression()

        params = {}

    elif best_model_name == "Decision Tree Regressor":

        model = DecisionTreeRegressor(random_state=42)

        params = {

            "max_depth":[None,5,10,20],

            "min_samples_split":[2,5,10]

        }

    elif best_model_name == "Random Forest Regressor":

        model = RandomForestRegressor(random_state=42)

        params = {

            "n_estimators":[100,200,300],

            "max_depth":[None,10,20],

            "min_samples_split":[2,5]

        }

    elif best_model_name == "XGBoost Regressor" and XGBOOST_AVAILABLE:

        model = XGBRegressor(random_state=42)

        params = {

            "learning_rate":[0.01,0.1],

            "max_depth":[3,5,7],

            "n_estimators":[100,200]

        }

    else:

        raise ValueError("Unsupported model")

    # Linear Regression has no tuning

    if params == {}:

        model.fit(X_train,y_train)

        return {

            "best_estimator":model,

            "best_params":{},

            "best_cv_score":None

        }

    grid = GridSearchCV(

        estimator=model,

        param_grid=params,

        cv=5,

        scoring=scoring,

        n_jobs=-1

    )

    grid.fit(X_train,y_train)

    return {

        "best_estimator":grid.best_estimator_,

        "best_params":grid.best_params_,

        "best_cv_score":round(grid.best_score_,4)

    }