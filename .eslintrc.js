module.exports = {
	  "env": {
		    "es6": true,
		    "node": true
	  },
	  "parserOptions": {
		    "ecmaVersion": 6,
		    "ecmaFeatures": {
			      "jsx": true
		    }
	  },
	  "extends": "airbnb",
	  "rules": {
		    "jsx-a11y/anchor-is-valid": ["error", {
			      "components": ["Link"],
			      "specialLink": ["hrefLeft", "hrefRight", "to"],
			      "aspects": ["noHref", "invalidHref", "preferButton"]
		    }]
	  }
}
