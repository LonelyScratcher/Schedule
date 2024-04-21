import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from "@/views/home";
import Login from "@/views/login";
import Search from "@/views/search";
import UserCenter from "@/views/userCenter";
import AdminCenter from "@/views/adminCenter";
import Access from "@/views/access";
export default function App(){
    const testObj = {
        isTest:true,
        testPath:'/home'
    }
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {
                        testObj.isTest?
                            <Redirect to={testObj.testPath}/>:<Redirect to="/home"/>
                    }
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/search">
                    <Search/>
                </Route>
                <Route path="/user-center">
                    <UserCenter/>
                </Route>
                <Route path="/admin-center">
                    <AdminCenter/>
                </Route>
                <Route path="/access">
                    <Access/>
                </Route>
            </Switch>
        </Router>
    )
}
