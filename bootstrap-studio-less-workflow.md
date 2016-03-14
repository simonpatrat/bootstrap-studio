#Bootstrap studio LESS Workflow
Going further in creating customizable themes

##1 - Creating theme with Bootstrap Studio

Make your theme by creating pages and organize HTML elements inside

The **styles.less** file may only include helpers and generic / general styles

When a component needs specific styles, assign it a class (e.g *"my_component"*), then create a style file with component class name (e.g *"my_component.css"*).
Then, into *my_component.css*, englobe component styles properties and values in the component class.

#####e.g :
```css
    .my_component p {
        color: deepskyblue;
    }
```

##2 - Add each component to components library

#### To add a component to library :
In the left panel, into the simplified DOM preview called **"Overview"**, right click on the component and in the contextual menu select **"Add to library"**
Your component wil now be disponible in the **"Components"** menu of the left panel when clicking on the **"User"** tab.
#### (Optional) Export component
Now, in this menu, if you click the menu icon on the right of component name, you'll see a menu in which you can select to **export** your component.
If you choose to export, Bootstrap Studio will show a new modal window in which you can choose to include component's styles to exported version or not.

##3 - LESS

Here is a exemple of file import structure when you're working with bootsrap and LESS

###LESS FILES IMPORT STRUCTURE :

```
LESS FILES IMPORT STRUCTURE :
    import.less
        importing :
            bootsrap.less // from your bootstrap folder
            variables.less // from your LESS folder --> these variables override bootstrap variable.less file
            theme.less // Your base theme
            components.less // The file which imports all the components style files independently
                - component_my_component-1.less
                - component_my_component-2.less
                - component_my_component-2.less
            site-styles.less // This file define additional and specific styles for the site

```

#### LESS exemple of an *import.less* file :

Here is an exemple of **import.less** file :

```less
    @import "your-path-to-bootstrap-folder/bootstrap.less"; // from your bootstrap folder
    @import "your-path/variables.less"; // from your LESS folder --> these variables override bootstrap variable.less file
    @import "your-path/theme.less"; // Your base theme if necessary
    @import "your-path/components/components.less"; // The file which imports all the components style files independently
    @import "your-path/style.less"; // This file define additional and specific styles for the site
```

And the components.less file goes like this :

```less
    @import "your-path/components/component_component_name_1.less";
    @import "your-path/components/component_component_name_2.less";
    @import "your-path/components/component_component_name_3.less";
    @import "your-path/components/component_component_name_4.less";
```

Where each component will be the LESS version of the exported *component_my_component.css* file from bootsrap studio.

**So, then your could reorganize your code in each component to switch properties values into variables you have defined in your *variables.less* file**

##4 - Begin to customize

Now you are ready to begin mofiying bootstrap variables or creating your own to customize your theme.