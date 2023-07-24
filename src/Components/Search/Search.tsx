import { withRouter } from "../../HOC";
import "./Search.css";
import SearchController from "./SearchController";
export class Search extends SearchController {
  render() {
    return (
      <div>
        <div className="search">
          <div className="search-form">
            <input
              type="text"
              placeholder="Find a user"
              onFocus={() => this.setState({ showSearch: true })}
              onChange={(e) => this.handleSearchUser(e)}
            />
          </div>
          {this.state.error ? "User not found" : ""}
          {this.state.showSearch === true ? (
            <div className="user-chat" onClick={this.handleSelect}>
              <img src={this?.state?.actualUser?.photoURL} alt="" />
              <div className="user-chat-info">
                <span>{this?.state?.actualUser?.displayName}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
