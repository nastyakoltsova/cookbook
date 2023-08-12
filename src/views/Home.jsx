const React = require('react');
const Layout = require('./Layout');

function Home({ title, user }) {
  return (
    <Layout user={user} title={title}>
      <div>
        <h2 className="text-red-600">{title}</h2>
      </div>
    </Layout>
  );
}

module.exports = Home;
