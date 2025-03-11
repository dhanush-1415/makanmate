import React, { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const BlogDetails = () => {

    const { blogCode } = useParams();


    return(
        <>

            {blogCode === "guide-to-singapore’s-catering-services-by-makan-mate" ? (
                <>
            <Grid>
                <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                    <img src="https://makanmate.com/wp-content/uploads/2022/10/Healthier-Choice-Buffet-Menu-A.png" alt="d1" width="100%" />
                </Grid>
            </Grid>
            <Grid sx={{width:'80%' , margin:"40px auto"}}>
                <Typography className='typo55' >Singapore is a land of foodies. Every milestone, family gathering, friend reunion and celebration is centred around food. To meet 
                    the growing demand for catering services, more establishments have been diversifying their offerings. Catering services have emerged as a 
                    popular choice for various occasions. The range of Singapore’s catering services can scale up or down for small parties, weddings, corporate 
                    events, holidays, and special celebrations. Choosing the right catering service is crucial as it can greatly enhance the overall experience of any event.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Small Party Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    For intimate gatherings, you might want to avoid over-ordering to avoid food wastage. At the same time, cooking might not be your forte. Small party catering is the perfect middle ground to ensure warm, quality meals at a convenience you can afford. These services can provide a variety of menu options, take care of the setup and cleanup, and ensure that guests have an enjoyable dining experience. When selecting a small party catering service, it is important to consider factors such as budget, menu customisation options, and the reputation of the catering company.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Wedding Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    When preparing for the big day, couples tend to get overwhelmed with all the logistics that go into planning such a large-scale event. Catering plays a significant role in creating a memorable experience for the couple and their guests. It is important to choose a wedding catering service that can accommodate the unique preferences and dietary requirements of the couple and their guests. Factors to consider include menu customisation, quality of food and presentation, level of service, and the ability to handle large guest numbers.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Corporate Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    At a corporate gathering, every decision can affect the reputation of your brand. Whether it is to partners, visitors, conference attendees or your own staff, delicious corporate catering can be a welcome respite after a long seminar. Providing high-quality food and service at corporate events can enhance the overall professional impression and create a positive atmosphere for networking and discussions. When selecting a corporate catering service in Singapore, it is crucial to consider factors such as reliability, flexibility, menu options suitable for various dietary restrictions, and the ability to handle large-scale events.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Halal Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    Halal catering is crucial to make sure everyone feels included at an event. Most caterers in Singapore are halal to reach a wider audience. Having a meal together is what brings people together and serving halal food makes sure that everyone gets a seat at the table. When searching for halal catering services, it is advisable to seek out certified and reputable providers known for their commitment to quality and adherence to halal standards.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Buffet Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    With the rise of food delivery services islandwide, you might wonder if buffet catering still has its place. Buffet catering carries a lot of the burden of hosting an event off your shoulders. You will not have an estimate of how much food to order for the number of people you have. There will be no concern if the food arrives on time and is warm. You also don’t have to worry about the presentation of the food. 
                </Typography>
                <Typography className='typo55' >
                    There are also new innovations that make the dining experience as close to dining-in as possible. For example, many buffet catering services in Singapore offer self-heating packaging to keep the food hot and steamy when you are ready to eat.
                </Typography>
                <Typography className='typo55' >
                    Buffet catering is a popular choice for various events in Singapore due to its versatility and the wide range of options it offers to guests. When selecting a buffet catering service, it is important to consider factors such as menu variety, dietary options, the quality of food, and the ability to accommodate specific themes or preferences.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Party Catering in Singapore
                </Typography>
                <Typography className='typo55' >
                    Elevating any event, a party catering service should tailor its offerings to suit the chosen theme. Going beyond mere sustenance, it serves as a welcome distraction for guests who may tire of continuous mingling. Understanding that a party might serve as a cheat day for some attendees, the catering service ensures that the menu is a worthwhile indulgence. With a focus on delicious and convenient options that accommodate diverse dietary preferences, the culinary experience becomes a standout feature of any celebration. Guests are invited to savour flavours that not only complement the occasion but also create lasting memories.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Catering for Holidays and Special Celebrations
                </Typography>
                <Typography className='typo55' >
                    Catering for holidays and special celebrations transcends the realm of ordinary dining, transforming gatherings into extraordinary experiences. A skilled catering service plays a pivotal role in infusing these occasions with culinary delight and thematic sophistication. From the vibrant hues of a Christmas feast to the romantic ambience of a Valentine’s Day soirée, catering for holidays and special celebrations involves meticulous planning and creative flair. 
                </Typography>
                <Typography className='typo55' >
                    Selecting a catering service that specialises in these unique events is essential, as it ensures a tailored menu that complements the festive spirit. A seasoned caterer brings more to the table than just exquisite dishes—they craft an immersive dining experience that enhances the joy and significance of the occasion. Whether it’s a family reunion, a milestone birthday, or a corporate holiday party, the right catering service elevates the event, leaving a lasting impression on guests and hosts alike.
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Choose Makan Mate For Your Catering Needs
                </Typography>
                <Typography className='typo55' >
                    For a culinary journey that truly encapsulates the spirit of your event, Makan Mate stands out as the ideal catering partner in Singapore. In a city that revolves around food, Makan Mate takes pride in delivering a diverse range of halal catering services tailored to fit any occasion.  From small, intimate gatherings to grand weddings, corporate events, and festive celebrations, Makan Mate understands that the right catering can significantly enhance the overall experience. 
                </Typography>
                <Typography className='typo55' >
                    We serve a wide variety of cuisines, including Chinese, Korean, Indian, Malay, Western, Vegetarian and more. Do not worry about having too much food at your event, as the food will keep your guests coming back for a second and third round. Check out our full menu range at https://makanmate.com/catering-menu/ and get your next event sorted.
                </Typography>
            </Grid>
                </>
            ) : blogCode === "indulge-in-mini-high-tea-buffet-catering-options-from-makan-mate" ? (
                <>
                    <Grid>
                        <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                            <img src="https://makanmate.com/wp-content/uploads/2023/07/collection-of-delicious-assorted-mini-dessert-scaled.jpg" alt="d1" width="100%" />
                        </Grid>
                    </Grid>
                    <Grid sx={{width:'80%' , margin:"40px auto"}}>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                    </Typography>
                    <Typography className='typo55' >
                    Providing delicious food and drinks is essential for creating a memorable experience when hosting events and gatherings. In recent years, mini high tea catering and buffet services have gained immense popularity in Singapore. They are the perfect opportunity for your guests to take a break and socialise over light bites during the event. There is something for everyone with savoury delights and sweet treats that can satisfy every tastebud.

This blog post will explore the benefits of choosing mini high tea catering and buffet services, highlighting their convenience and the growing demand for this unique dining experience.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Benefits of Mini High Tea Catering and Buffet Services
                    </Typography>
                    <Typography className='typo55' >
                    Mini high tea catering and buffet services offer numerous advantages for events and gatherings:
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Convenience and Ease
                    </Typography>
                    <Typography className='typo55' >
                    Opting for mini high tea catering and buffet services means handing over the responsibility of food and drinks to professionals. This allows you to focus on other aspects of your event while ensuring that your guests are treated to a delightful culinary experience.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Variety of Options
                    </Typography>
                    <Typography className='typo55' >
                    Mini high tea catering and buffet services provide a wide range of food and beverage options. From finger sandwiches and scones to delectable pastries and teas, there is something for everyone to enjoy. Guests can indulge in a variety of flavours and choose their favourites, creating a personalised dining experience.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Opportunity to Mingle
                    </Typography>
                    <Typography className='typo55' >
                    Mini high tea catering and buffet services create a conducive environment for socialising and mingling among guests. As they navigate the delectable food and beverage stations, guests can converse and bond over their favourite treats. This interactive dining setup encourages networking, fostering a lively and vibrant atmosphere that enhances the overall enjoyment of the event.
                    </Typography>
                    <Typography className='typo55' >
                    Mini high tea catering and buffet services have become a popular choice for events and gatherings in Singapore. They offer convenience, a variety of options and can adjust to dietary preferences. Makan Mate is an excellent choice for mini high tea catering and buffet services if you’re considering hosting an event or gathering.
                        </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Order Mini High Tea Catering and Buffets from Makan Mate
                    </Typography>
                    <Typography className='typo55' >
                    At Makan Mate, we pride ourselves on delivering high-quality mini high tea catering and buffet services with a variety of options. We are a halal caterer with an experienced team that can handle adjustments for dietary requirements. From preparing delicious bites to providing impeccable service, we ensure that your guests will have an unforgettable dining experience.

                    Don’t hesitate to consider Makan Mate for your next event or gathering. Let us take care of the food and drinks while you focus on creating cherished memories with your loved ones. Contact us today to explore our package options and experience the delight of mini high tea catering and buffet services.
                    </Typography>
                    </Grid>
                </>
            ) : blogCode === "vegetarian-catering-for-small-parties:-delightful-menus-to-impress-your-guests" ? (
            <>
                 <Grid>
                        <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                            <img src="https://makanmate.com/wp-content/uploads/2023/06/assorted-fresh-salads-displayed-on-buffet-scaled.jpg" alt="d1" width="100%" />
                        </Grid>
                    </Grid>
                <Grid sx={{width:'80%' , margin:"40px auto"}}>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                Opt for catering for smoother party planning
                    </Typography>
                    <Typography className='typo55' >
                    Food is at the heart of every gathering, so getting the menu right is crucial for any party. From buying ingredients, adjusting recipes to meet dietary needs, and cleaning up, making a home-cooked meal for your guests can be draining. The next best option is to order a catering service into the comfort of your home. This will give guests the warmth of eating around your dining table while freeing you of the hassle of preparing the food on top of your host duties. 
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Why choose vegetarian catering?
                    </Typography>
                    <Typography className='typo55' >
                    Getting vegetarian catering might not be the first instinct for most Singaporeans. Here are a few reasons to consider getting vegetarian catering for your next party.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Meet a wide range of dietary restrictions
                    </Typography>
                    <Typography className='typo55' >
                    Singapore is a melting pot of cultures, with many groups following their unique dietary guidelines. Consuming beef, pork or any other meat is prohibited for followers of certain religions. Other guests might also avoid meat on certain days for health or ethical reasons. Getting vegetarian catering can be a one size fits all approach to meet the needs of many different subgroups at once. This can make it easier to plan a party menu when there are various dietary restrictions to accommodate.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Create an inclusive party
                    </Typography>
                    <Typography className='typo55' >
                    Often when there are vegetarians joining a party, a host might choose to get separate food arrangements for them or ensure that a certain proportion of dishes are vegetarian-friendly. Take a step further in thoughtfulness by allowing your vegetarian guests to feel included in the whole spread of dishes that is served during the party. By opting for vegetarian catering, everyone can share food and eat together without being cautious about accidentally mixing utensils or cross-contamination with meat dishes.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Take a step in sustainability
                    </Typography>
                    <Typography className='typo55' >
                    The demand for meat consumption has fueled the animal agriculture industry to bear a significant carbon footprint, contributing to deforestation, water pollution, and greenhouse gas emissions. With the choice of vegetarian catering, you can take a small step to reduce your environmental impact and introduce your guests to the goodness of vegetarian food.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Order Makan Mate’s Vegetarian Catering
                    </Typography>
                    <Typography className='typo55' >
                    At Makan Mate, we know the importance of good food to keep your guests happy and healthy. Our vegetarian catering options offer a wide range of dishes your meat lover friends will love. From mains to drinks and desserts, we cover a full course meal so you can focus on entertaining your guests. head to our website, pick a party set, indicate your dietary preferences and get it delivered to your doorstep on your selected date. Satisfying your guests with a wholesome meal is just one click away.
                    </Typography>
                </Grid>
            </>
            ): blogCode === "healthy-and-tasty:-how-steamboat-buffet-catering-offers-a-unique-dining-experience" ? (
            <>
                 <Grid>
                        <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                            <img src="https://makanmate.com/wp-content/uploads/2023/06/chinese-hot-pot-known-soupfood-steamboat-scaled.jpg" alt="d1" width="100%" />
                        </Grid>
                    </Grid>
                <Grid sx={{width:'80%' , margin:"40px auto"}}>
                <Typography className='typo55' >
                Steamboat buffet catering, being a delightful option, serves as a perfect addition to any gathering and has the ability to please any crowd. With a bubbling pot filled with nourishing broth and a wide range of ingredients, everyone gets to decide what they want to eat from the selection. Steamboats are a delicious and convenient opportunity for fostering quality time while eating to bring your friends and family close.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    What is Steamboat Buffet Catering?
                    </Typography>
                    <Typography className='typo55' >
                    Steamboat buffet catering delivers a set of steamboat essentials to your doorstep to take the burden off you when deciding how to curate the perfect hotpot. When getting ingredients for a steamboat, it can be challenging to find the sweet spot between too few ingredients that can leave your guests hungry and too much food that will be difficult to keep for the next day. 
                    By getting a steamboat buffet catering set, you will not have to worry about getting the right ingredients. Your caterer will be able to determine a suitable package to please your guests. At Makan Mate, our package includes seasonal greens, whole prawns, scallops, enoki and shitake mushrooms, ebiko fish balls, sea cucumber, meatballs, and so much more in a hearty collagen herbal chicken broth.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Why get Steamboat Buffet Catering?
                    </Typography>
                    <Typography className='typo55' >
                    Steamboat buffet catering is a popular choice for parties. Let’s take a look at why it is a crowd favourite.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                        
                    </Typography>
                    <Typography className='typo55' >
                    Healthy & Fresh Option <br/>

When catering for parties, it is common to go for something indulgent to impress your guests. Steamboats are the perfect way to go a healthier route while satisfying your guests. With the addition of leafy greens, fresh seafood, lean proteins, and staples, steamboats offer a balanced and satisfying way to fill stomachs and hearts.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                        
                    </Typography>
                    <Typography className='typo55' >
                    Easy to Prepare <br/>

With steamboat buffet catering, you get portions perfect for your groups’ size with pre-prepared broths and pre-cut ingredients. Once you get a catering package, simply prepare a pot and utensils and you are ready for your guests to arrive. 
                    </Typography>

                    <Typography className='typo55' >
                    Inclusive Dining Experience <br/>

Steamboats are perfect for bringing people together. With a central pot that everyone is digging into, help your loved ones fish out ingredients once they have been perfectly cooked and pass around the condiments to share. If your guests are meeting each other for the first time, the steamboat will give them opportunities to interact.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Get Steamboat Buffet Catering with Makan Mate
                    </Typography>
                    <Typography className='typo55' >
                    For your next gathering, impress your guests with fresh and flavourful ingredients without worrying that the food will get cold when your guests arrive. At Makan Mate, our soups are made daily, simmering for hours on the stove to extract the best nutrients and flavours for a rich broth. 

                    Our steamboat buffet catering sets are great for intimate gatherings, huddled over a warm comforting soup. There’s something for everyone with our range of sets brimmed with varieties of seafood, leafy vegetables, mushrooms, meat, noodles, and condiments.

                    Browse our selection of Makan Mate steamboat buffet catering sets to prepare for your next party.
                    </Typography>
                </Grid>
            </>
            ): blogCode === "create-an-excellent-party-experience-with-a-customized-makan-mate-buffet-menu" ? (
            <>
                <Grid>
                        <Grid container sx={{maxHeight:'500px', overflow:'hidden'}}>
                            <img src="https://makanmate.com/wp-content/uploads/2023/05/cooked-food-inside-food-warmer-1.png" alt="d1" width="100%" />
                        </Grid>
                    </Grid>
                <Grid sx={{width:'80%' , margin:"40px auto"}}>
                <Typography className='typo55' >
                Hosting a party can be a blast, but let’s be honest – it can also be exhausting. From the guest list to the decorations to the menu, it’s easy to feel overwhelmed. On the big day, there’s also the added stress of making small talk with your acquaintances, in-laws and other guests.

                To help you through the process of hosting a party, this guide will cover everything from mini buffet catering, and how it can help you handle all your guests’ needs, to preparations you can make beforehand to make your party the talk of the town. We’ll introduce the benefits of mini buffet catering in Singapore so you don’t have to spend time figuring out a complicated grocery list. So grab a drink (or five), take a deep breath, and let’s dive into how to host the best party – starting with the food.

                    </Typography>
                    
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    What is mini buffet catering?
                    </Typography>
                    <Typography className='typo55' >
                    Mini buffet catering is an option for meals or bite-sized dishes that can be served either as refreshments or as the main course. This type of catering is ideal for more intimate gatherings like small-scale office parties, birthday parties and family reunions with less than 20 guests. Depending on the type of mini buffet you are looking for, the menu items can range from light bites for high-tea or full 5-course meals with drinks and desserts. 

                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Mini Buffet Catering: Hosting Made Convenient
                    </Typography>
                    <Typography className='typo55' >
                    When you’re in a time crunch, catering food can save you hours of time. Even if a recipe only takes 45 minutes to cook, there is a list of hidden tasks that recipe blogs don’t account for. 
                    This is what preparing a home-cooked meal would look like. First, you consider everyone’s dietary restrictions and preferences, next decide on what to cook, and then figure out the ideal portion size so that you can fill everyone without too much leftovers. Once that is clear, you make a grocery list and find out which supermarkets you can find the ingredients at and make a trip there. Then, you prepare the ingredients and start cooking ahead of time.  Once you’ve cleaned up, you can focus on the final touches to get your party ready. When the guests arrive, it’s time to reheat the food and serve it. Fingers crossed that they enjoy the spread!

                    Let’s compare it to engaging mini buffet catering. You simply go to the caterer’s website, choose the menu, fill in your special requests, book a date and time and wait for the food, cutlery and disposables to arrive on the day. 
                    Be worry-free and leave the cooking and delivery to Makan Mate so you can save your time and energy for mingling with your guests and enjoying the festivities. 
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Mini Buffet Catering: Pleasing every Palate
                    </Typography>
                    <Typography className='typo55' >
                    Bring your guests on a culinary adventure to the destination of your choice with the wide range of cuisines that mini buffet catering provides. From enjoying classic Western dishes to indulging in the bold flavours of Korean food, the spice of Indian curries, delicious Malay food and authentic Chinese food, you will be spoiled for choice.
                    When you pick the right caterer, you will not have to choose between getting a feast that caters to dietary restrictions and one that serves a wide range of cuisines. Cooked in a halal-certified kitchen, you can get the most out of Korean soups, salads, meats, and noodles while making sure it is completely halal and that dishes can be swapped out to provide vegan or vegetarian options at your request. At the dining table, no one’s needs should get left behind. Give your guests peace of mind knowing that they are able to enjoy the spread in front of them.

                    At Makan Mate, our years of catering experience have allowed us to truly understand Singaporean taste buds. That’s why we never skimp on taste even while serving food that has no MSG, less oil and salt. When choosing between our range of cuisines, it’s impossible to make the wrong choice. From our Korean menu, enjoy a well-balanced diet with beef bulgogi bibimbap served with sauteed shimeji mushrooms, seasoned spinach, soybean sprouts,  kimchi and egg. From our vegan options, enjoy golden crispy yasai gyoza, prosperous snow fungus and mushrooms on seasonal vegetables, sauteed basil beancurd and braised ee-fu noodles with golden mushrooms.

                    Letting your guests know what each dish contains helps them decide what to fill their plate with. You can put up labels so they know what they can eat, and what they should avoid based on their dietary requirements. It’s the little things like this that make your guests feel cared for so they can dig in without worry.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Finding the Right Mini Buffet Catering Service
                    </Typography>
                    <Typography className='typo55' >
                    Living in a food haven, there are so many catering options available so it can be overwhelming to choose the right one for your needs. But don’t worry, we’ve got you covered! Here are some tips to help you find the perfect mini buffet catering service for your event.

                    Consider your budget<br/>
                    Determine how much you can afford to spend on catering and make sure to find a caterer that fits nicely within your budget. With the right caterer, you can spend well within your means while serving your guests the best. 
                    <br/>
                    Know your party
                    <br/>
                    Next, think about the type of event you’re hosting. Will it be a formal or casual affair? Will there be a specific theme or cuisine that you want to serve? Make sure to choose a catering service that can accommodate what your party is about.
                    <br/>
                    Get a reputable caterer
                    <br/>
                    When it comes to choosing a caterer, reputation is key. Do your research and read reviews on Google and Facebook to get a sense of previous clients’ experience with the caterer. Ask your friends and family for caterers they have engaged in the past. 

Another important factor to consider is the quality of the food. Look for a caterer that uses fresh, high-quality ingredients and is flexible to accommodate dietary restrictions or preferences.
                    <br/>
                    Logistics
                    <br/>
                    Don’t forget about the logistics! Make sure that the catering service can deliver to your venue at the date and time that you need. Check the terms of the delivery to see if the caterer provides disposable plates, utensils and cups so you can make the necessary arrangements. If the caterer also has a full table set-up with warmers, they may have a cut-off time when they will collect the trays back so keep that in mind when deciding when to serve the food. For mini catering services, you may not need all the fancy table set-ups since it is a small party. 

With these tips in mind, finding the right mini buffet catering service for your event should be a breeze. At Makan Mate, we are honoured to be the trusted catering partner for many corporate events, birthday parties, festive celebrations and family gatherings through the years. With a long list of menu options, you are sure to find a mini buffet catering option that sits within your budget, and suits your guests’ requirements. Our mini catering is served in aluminium trays so you don’t have to worry about a collection time to return anything. 

Now that the catering is settled, it’s time to get everything else in place for the big day.
                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                    Tips for Hosting an Intimate Gathering
                    </Typography>
                    <Typography className='typo55' >
                    Here’s a guide to all the other elements that go into planning and hosting a party so you won’t miss out on anything:

                    </Typography>
                    <Typography className='typo1' sx={{margin:'20px 0'}}>
                        
                    </Typography>
                    <Typography className='typo55' >
                        
                    </Typography>
                </Grid>
            </>
            )
            : blogCode === "guide-to-vegan-catering-in-singapore-to-plan-for-your-next-event" ? (
            <></>
            )
            : blogCode === "5-reasons-to-choose-halal-catering-for-your-next-party" ? (
            <></>
            )
            : blogCode === "elevate-your-party-experience-in-singapore-with-makan-mate’s-mini-party-sets" ? (
            <></>
            ) : null}
            <Grid sx={{width:'80%' , margin:"40px auto"}}>
               
               
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
                <Typography className='typo55' >
                    
                </Typography>
                <Typography className='typo1' sx={{margin:'20px 0'}}>
                    
                </Typography>
            </Grid>
        </>
    )
}

export default BlogDetails;