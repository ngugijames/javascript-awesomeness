# Introduction to Computer Graphics Assignment 4

YOU MUST UPLOAD THE FOLLOWING IN SOME TYPE OF CONTAINER (TAR,ZIP,etc)
- A README DESCRIBING WHAT YOU DID AND DID NOT DO
- THE SOURCE CODE FOR YOU SUBMISSION – INCUDE EVERYTHING WE NEED TO 
COMPILE AND RUN YOUR SUBMISSION
100 POINTS AVAILABLE / PARTIAL CREDIT MAY BE AWARDED

The following is required for the assignment and provides 50 points of extra credit:
1. Get a simple WebGL capable window to display without error – 5 points.

2. Implement functionality to load an image(s) into a buffer(s) suitable for use as a 
texture map. You must include whatever files are needed for us to run your code 
(images, etc) – 20 points.

3. Apply the entire texture onto all faces of a cube that has a size of your choosing. That 
is, the texture coordinates should range from (0,1) in both the s and t dimensions. –
25 points.

4. Create a second cube where the image is again applied to all faces and is zoomed o u t
by 50% (the image should shrink). Furthermore, texture coordinates should be set 
such that the aspect ratio of the image is maintained on the face of the cube – 25
points.

5. Implement MipMapping for the zoomed texture (#4) using tri-linear filtering. 
Filtering for the non-zoomed texture (#3) should be nearest neighbor.– 10 points.

6. Position both cubes within the view of your default starting camera view – positions 
of the cubes and their position relative to the camera is up to you. – 10 points.

7. Define two keys ‘i’ and ‘o’ that move the camera nearer or farer away from the cubes
so we can see the effect of the texture filtering as they get smaller or larger – 5
points.

# Extra Credit
1. Use the key ‘r’ to start and stop the rotation both cubes. Cube from step #3 should 
rotate around the Y-axis at a rate of  60 rpm and the cube from step #4 should rotate 
at half this rate around the X-axis. – 10 points.

2. Use the ‘t’ key to start and stop the rotation of the texture maps on all faces of the 
cube from step #3 around the center of each face at a rate of 60 rpm. – 20 points

3 . Use the ‘s’ key to start and stop the continuous scrolling the texture map on the cube 
from step #4 in a direction and speed of your choosing (as long as its slow enough to 
see) across the each face of the cibe. You will need to select a texture wrap mode so 
that the image repeats and reset the texture coordinates periodically. – 20 points