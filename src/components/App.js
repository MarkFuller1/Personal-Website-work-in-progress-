import React, { useState, useEffect } from "react";
import BlogHeader from "./Blog/BlogHeader";
import BlogFeed from "./Blog/BlogFeed";
import BlogNavigator from "./Blog/BlogNavigator";
import { Grid } from "@material-ui/core";
import * as API from "../util/api";

const App = (props) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    setPostsLoading(true);
    API.getAllPosts()
      .then((response) => response.data)
      .then((data) => setBlogPosts(data))
      .catch((error) => console.log(error))
      .finally(() => setPostsLoading(false));
  }, []);

  useEffect(() => {
    setPostsLoading(true);
    if (selectedTopic.length === 0) {
      setPostsLoading(true);
      API.getAllPosts()
        .then((response) => response.data)
        .then((data) => setBlogPosts(data))
        .catch((error) => console.log(error))
        .finally(() => setPostsLoading(false));
    }
    setPostsLoading(true);
    API.getPostByTag(selectedTopic)
      .then((response) => response.data)
      .then((data) => setBlogPosts(data))
      .catch((error) => console.log(error))
      .finally(() => setPostsLoading(false));
  }, [selectedTopic, setSelectedTopic]);

  useEffect(() => {
    API.getAllTags()
      .then((response) => response.data)
      .then((data) => setAvailableTags(data));
  }, []);

  console.log("Selected:", selectedTopic);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item lg={2}>
          <BlogNavigator
            setSelected={setSelectedTopic}
            availableTags={availableTags}
            setAvailableTags={setAvailableTags}
            setBlogPosts={setBlogPosts}
          />
        </Grid>
        <Grid item lg={9}>
          <BlogHeader />
          {postsLoading ? (
            <center>Please wait...</center>
          ) : (
            <BlogFeed
              blogPosts={blogPosts}
              setBlogPosts={setBlogPosts}
              availableTags={availableTags}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
