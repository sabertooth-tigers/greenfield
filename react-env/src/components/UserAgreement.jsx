import React from 'react';
import { Link } from 'react-router-dom';


const UserAgreement = () => (
  <div id="UserAgreement">
    <div className="container">
      <h1>User Agreement and Terms of Services</h1>
      <div>
        Bacon ipsum dolor amet landjaeger mollit rump pastrami tongue.
        Sunt mollit turducken in flank.
        Officia adipisicing mollit shoulder hamburger consequat dolor alcatra ut nulla tail
        kielbasa reprehenderit voluptate pork chop.
        Burgdoggen qui buffalo tail aliquip short ribs jowl exercitation prosciutto.
        <br /><br />
        Veniam in shankle cillum frankfurter non pancetta in flank landjaeger.
        Nostrud duis short ribs ball tip.
        Laboris filet mignon fugiat irure consequat adipisicing shank anim short loin tongue dolore
        rump occaecat cupim capicola. Minim esse boudin adipisicing kielbasa aliquip tempor.
        <br /><br />
        Magna consequat cillum nostrud, salami shoulder proident kevin spare ribs do cupim.
        Rump ut jerky bresaola, exercitation turkey quis picanha t-bone in sirloin ipsum shankle
        porchetta pork loin. Salami ad pariatur fatback. Tenderloin id corned beef est doner bacon
        do lorem pastrami laboris. Pork chuck officia quis, esse ball tip magna fatback pancetta.
        <br /><br />
        Filet mignon pork loin lorem cillum, ut landjaeger irure sint pariatur elit burgdoggen
        exercitation. Beef ea sirloin dolor hamburger exercitation enim buffalo boudin in dolore
        turducken. Cupidatat laborum eu cillum irure venison. Fatback landjaeger filet mignon irure
        chicken culpa andouille jerky fugiat consequat excepteur dolore beef ribs drumstick picanha.
        <br />
      </div>
      <div className="container-footer">
        <Link to="/signup/form">Agree</Link>
        <Link to="/">Disagree</Link>
      </div>
    </div>
  </div>
);

export default UserAgreement;
