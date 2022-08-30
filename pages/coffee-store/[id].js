import { useRouter } from "next/router";
import Head from "next/head";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css'
import cls from "classnames"
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      })
    },
  };
}


export  async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore)=>{
      return {
        params: {
          id: coffeeStore.id.toString(),
        }
      }
    })
return {
  paths,
  fallback:true
}
}

const DynamicRoute = ((props) => {
  const router = useRouter();
  const query = router.query.id;
  const {name,address,neighborhood,imgUrl} = props.coffeeStore

  const handleUpvoteButton = () => {
    console.log("handle upvote")
  }

  if (router.isFallback){
    return <div>Loading...</div>;
  }
  return (
    <div className ={styles.layout}>
    <div className={styles.backToHomeLink}>
      <Head>
        <title>{name}</title>
      </Head>
      </div>
      <div className={styles.container}>
      <div className ={styles.col1}>
      <Link href="/">← Back to Home</Link>
      <div className ={styles.nameWrapper}>  

      <h1 className ={styles.name}>{name}</h1>

      </div>
    
      <Image src={imgUrl ||"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={600} height={360} className={styles.storeImg} alt={name} />
      </div>

      <div className ={cls("glass",styles.col12)}>
      { address && ( <div className ={styles.iconWrapper}>
      <Image src={"/static/icons/storefront.svg"} width={24} height={24}/>
      <p className ={styles.text}>{address}</p>
      </div>
      
      )}
     
      {neighborhood && (
        <div className ={styles.iconWrapper}>
      <Image src={"/static/icons/nearMe.svg"} width={24} height={24}/>
      <p className ={styles.text}>{neighborhood}</p>
      </div>
      )}
     
      <div className ={styles.iconWrapper}>
      <Image src={"/static/icons/stars.svg"} width={24} height={24}/>
      <p className ={styles.text}>{1}</p>
      </div>

      <button className = {styles.upvoteButton} onClick={handleUpvoteButton}>Up vote</button>
      </div>
    </div>
    </div>
  );
});

export default DynamicRoute;