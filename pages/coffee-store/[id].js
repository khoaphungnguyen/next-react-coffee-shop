import { useRouter } from "next/router";
import Head from "next/head";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css'
import cls from "classnames"

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      })
    },
  };
}


export function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore)=>{
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
  const {imgUrl, address,name,neighbourhood} = props.coffeeStore

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
      <Link href="/">Back to Home</Link>
      <div className ={styles.nameWrapper}>  

      <h1 className ={styles.name}>{name}</h1>

      </div>
    
      <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
      </div>

      <div className ={cls("glass",styles.col12)}>

      <div className ={styles.iconWrapper}>
      <Image src={"/static/icons/storefront.svg"} width={24} height={24}/>
      <p className ={styles.text}>{address}</p>
      </div>

      <div className ={styles.iconWrapper}>
      <Image src={"/static/icons/nearMe.svg"} width={24} height={24}/>
      <p className ={styles.text}>{neighbourhood}</p>
      </div>

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