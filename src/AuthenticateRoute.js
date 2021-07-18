import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { httpService } from "./services/httpService";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const checkToken = async () => {
        let response = await httpService.getData("/api/checkToken");
        if (response) {
          this.setState({ loading: false });
        }
        else{
          this.setState({ loading: false, redirect: true });
        }
      };
      checkToken();
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
